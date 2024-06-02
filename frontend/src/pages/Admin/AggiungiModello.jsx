import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState, useCallback } from "react";
import FormInput from "../../components/FormInput";

const AggiungiModello = () => {
  const [formData, setFormData] = useState({
    brand: "",
    model: "",
    newServiceName: "",
    newServicePrice: "",
  });
  const [services, setServices] = useState([]);

  useEffect(() => {
    document.body.style.backgroundColor = "#007bff";
    return () => {
      document.body.style.backgroundColor = null;
    };
  }, []);

  const handleChange = useCallback((e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  }, []);

  const addService = () => {
    const { newServiceName, newServicePrice } = formData;
    if (newServiceName && newServicePrice) {
      setServices([
        ...services,
        { name: newServiceName, price: newServicePrice },
      ]);
      setFormData((prevData) => ({
        ...prevData,
        newServiceName: "",
        newServicePrice: "",
      }));
    }
  };

  const saveModel = () => {
    const modelData = {
      brand: formData.brand,
      model: formData.model,
      services,
    };
    console.log("Saved Model Data:", modelData);
    setFormData({
      brand: "",
      model: "",
      newServiceName: "",
      newServicePrice: "",
    });
    setServices([]);
  };

  const isSaveButtonDisabled = () => {
    return !(formData.brand && formData.model && services.length > 0);
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-md-8">
          <div className="card" style={{ minHeight: "600px" }}>
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Aggiungi Modello</h2>
              <form>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <FormInput
                      label="Brand"
                      type="text"
                      value={formData.brand}
                      onChange={handleChange}
                      id="brand"
                      required
                      style={{ maxWidth: "300px" }}
                    />
                  </div>
                  <div className="col-md-6">
                    <FormInput
                      label="Modello"
                      type="text"
                      value={formData.model}
                      onChange={handleChange}
                      id="model"
                      required
                      style={{ maxWidth: "300px" }}
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <FormInput
                      label="Nome Servizio"
                      type="text"
                      value={formData.newServiceName}
                      onChange={handleChange}
                      id="newServiceName"
                      style={{ maxWidth: "300px" }}
                    />
                  </div>
                  <div className="col-md-6">
                    <FormInput
                      label="Prezzo Servizio"
                      type="text"
                      value={formData.newServicePrice}
                      onChange={handleChange}
                      id="newServicePrice"
                      style={{ maxWidth: "300px" }}
                    />
                  </div>
                </div>
                <div className="d-grid gap-2 mb-3">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={addService}
                    style={{ width: "auto", margin: "0 auto" }}
                  >
                    Aggiungi Servizio
                  </button>
                </div>
                <h3>Servizi</h3>
                <ul className="list-group mb-3">
                  {services.map((service, index) => (
                    <li key={index} className="list-group-item">
                      <input
                        className="form-check-input me-2"
                        type="checkbox"
                        checked
                        readOnly
                      />
                      {service.name} - {service.price} euro
                    </li>
                  ))}
                </ul>
              </form>
            </div>
            <div className="d-grid gap-2 mb-5">
              <button
                type="button"
                className="btn btn-success"
                onClick={saveModel}
                disabled={isSaveButtonDisabled()}
                style={{ width: "auto", margin: "0 auto" }}
              >
                Salva
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AggiungiModello;
