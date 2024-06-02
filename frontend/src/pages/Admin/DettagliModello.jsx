import { useState, useEffect, useCallback, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import deviceData from "../../assets/json/devices.json";
import serviceData from "../../assets/json/services.json";
import CustomModal from "../../components/CustomModal";
import ServiceRow from "../../components/ServiceRow";
import { isEqual } from "lodash";

const DettagliModello = () => {
  const { brand, model } = useParams();
  const navigate = useNavigate();

  const [device, setDevice] = useState(null);
  const [originalModelDetails, setOriginalModelDetails] = useState(null);
  const [modelDetails, setModelDetails] = useState({
    model: "",
    price: "",
    services: [],
  });
  const [priceValidity, setPriceValidity] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [modalAction, setModalAction] = useState("");

  useEffect(() => {
    document.body.style.backgroundColor = "#007bff";
    return () => {
      document.body.style.backgroundColor = null;
    };
  }, []);

  useEffect(() => {
    const brandData = deviceData.find(
      (d) => d.brand === decodeURIComponent(brand)
    );
    if (brandData) {
      const modelData = brandData.models.find(
        (m) => m.model === decodeURIComponent(model)
      );
      if (modelData) {
        const updatedServices = serviceData.map((service) => {
          const modelService = modelData.services.find(
            (s) => s.id === service.id
          );
          return {
            ...service,
            price: modelService ? modelService.price : "",
            active: !!modelService,
          };
        });
        setDevice(brandData);
        setModelDetails({ ...modelData, services: updatedServices });
        setOriginalModelDetails({ ...modelData, services: updatedServices });

        const initialPriceValidity = updatedServices.reduce((acc, _, index) => {
          acc[index] = true;
          return acc;
        }, {});
        setPriceValidity(initialPriceValidity);
      }
    }
  }, [brand, model]);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setModelDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  }, []);

  const handleServiceChange = useCallback(
    (index, e) => {
      const { name, value } = e.target;
      const updatedServices = [...modelDetails.services];
      const updatedValidity = { ...priceValidity };
      if (name === "price") {
        const isValid = /^(\d+|\d{1,3}(,\d{3})*)(\.\d+)?$/.test(
          value.replace(",", ".")
        );
        updatedValidity[index] = isValid;
        setPriceValidity(updatedValidity);
      }
      updatedServices[index] = { ...updatedServices[index], [name]: value };
      setModelDetails((prevDetails) => ({
        ...prevDetails,
        services: updatedServices,
      }));
    },
    [modelDetails.services, priceValidity]
  );

  const handleServiceToggle = useCallback(
    (index) => {
      const updatedServices = [...modelDetails.services];
      updatedServices[index].active = !updatedServices[index].active;
      setModelDetails((prevDetails) => ({
        ...prevDetails,
        services: updatedServices,
      }));
    },
    [modelDetails.services]
  );

  const handleAddService = useCallback(() => {
    if (canAddService) {
      setModelDetails((prevDetails) => ({
        ...prevDetails,
        services: [
          ...prevDetails.services,
          { id: Date.now(), name: "", price: "", active: true },
        ],
      }));
      setPriceValidity((prevValidity) => ({
        ...prevValidity,
        [modelDetails.services.length]: true,
      }));
    }
  }, [canAddService, modelDetails.services.length]);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (!isEqual(originalModelDetails, modelDetails)) {
        setModalAction("save");
        setShowModal(true);
      }
    },
    [originalModelDetails, modelDetails]
  );

  const handleCancel = useCallback(() => {
    if (!isEqual(originalModelDetails, modelDetails)) {
      setModalAction("cancel");
      setShowModal(true);
    } else {
      navigate("/modelli");
    }
  }, [originalModelDetails, modelDetails, navigate]);

  const confirmAction = useCallback(() => {
    if (modalAction === "save") {
      console.log("Updated model details:", modelDetails);
      navigate("/modelli");
    } else if (modalAction === "cancel") {
      navigate("/modelli");
    }
    setShowModal(false);
  }, [modalAction, modelDetails, navigate]);

  const canAddService = useMemo(() => {
    if (modelDetails.services.length === 0) return true;
    const lastService = modelDetails.services[modelDetails.services.length - 1];
    return (
      lastService.name &&
      lastService.price &&
      priceValidity[modelDetails.services.length - 1]
    );
  }, [modelDetails.services, priceValidity]);

  if (!device) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-md-8">
          <div className="card" style={{ minHeight: "600px" }}>
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Dettagli Modello</h2>
              <form onSubmit={handleSubmit}>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label htmlFor="brand" className="form-label">
                      Brand
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="brand"
                      value={brand}
                      disabled
                      style={{ maxWidth: "300px" }}
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="model" className="form-label">
                      Modello
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="model"
                      name="model"
                      value={modelDetails.model}
                      onChange={handleInputChange}
                      disabled
                      style={{ maxWidth: "300px" }}
                    />
                  </div>
                </div>
                <h3 className="mb-3">Servizi</h3>
                <div className="row mb-2">
                  <div className="col-md-1"></div>
                  <div className="col-md-5">
                    <strong>Nome Servizio</strong>
                  </div>
                  <div className="col-md-5">
                    <strong>Prezzo</strong>
                  </div>
                </div>
                <div className="row mb-3">
                  {modelDetails.services.map((service, index) => (
                    <ServiceRow
                      key={service.id}
                      service={service}
                      index={index}
                      handleServiceChange={handleServiceChange}
                      handleServiceToggle={handleServiceToggle}
                      priceValidity={priceValidity}
                    />
                  ))}
                </div>
                <div className="d-grid gap-2 mb-3">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleAddService}
                    style={{ width: "auto", margin: "0 auto" }}
                    disabled={!canAddService}
                  >
                    Aggiungi Servizio
                  </button>
                </div>
                <div className="d-flex justify-content-center">
                  <button
                    type="button"
                    className="btn btn-secondary me-2"
                    onClick={handleCancel}
                  >
                    Annulla
                  </button>
                  <button type="submit" className="btn btn-success">
                    Salva
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <CustomModal
        show={showModal}
        onHide={() => setShowModal(false)}
        title={
          modalAction === "save"
            ? "Conferma Salvataggio"
            : "Conferma Annullamento"
        }
        body={
          modalAction === "save"
            ? "Vuoi davvero salvare le modifiche?"
            : "Vuoi davvero annullare le modifiche?"
        }
        onConfirm={confirmAction}
        confirmText="Conferma"
        cancelText="Annulla"
      />
    </div>
  );
};

export default DettagliModello;
