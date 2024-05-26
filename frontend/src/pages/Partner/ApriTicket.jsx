import "bootstrap/dist/css/bootstrap.min.css";

import devicesData from "../../assets/json/devices.json";
import servicesData from "../../assets/json/services.json";

import { useEffect, useState } from "react";

const ApriTicket = () => {
  const [cellulareCliente, setCellulareCliente] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [descrizioneProblema, setDescrizioneProblema] = useState("");
  const [selectedServices, setSelectedServices] = useState({});
  const [totaleStimato, setTotaleStimato] = useState(0);
  const [availableServices, setAvailableServices] = useState([]);

  const handleApriTicket = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    document.body.style.backgroundColor = "#007bff";
    return () => {
      document.body.style.backgroundColor = null;
    };
  }, []);

  useEffect(() => {
    const totale = Object.values(selectedServices).reduce(
      (acc, service) => acc + service,
      0
    );
    setTotaleStimato(totale);
  }, [selectedServices]);

  useEffect(() => {
    if (selectedBrand && selectedModel) {
      const device = devicesData.find((d) => d.brand === selectedBrand);
      if (device) {
        const model = device.models.find((m) => m.model === selectedModel);
        if (model) {
          const services = model.services.map((s) => ({
            ...s,
            name: servicesData.find((sd) => sd.id === s.id).name,
          }));
          setAvailableServices(services);
        } else {
          setAvailableServices([]);
        }
      } else {
        setAvailableServices([]);
      }
    } else {
      setAvailableServices([]);
    }
  }, [selectedBrand, selectedModel]);

  const handleServiceChange = (id, price, isChecked) => {
    setSelectedServices((prevServices) => ({
      ...prevServices,
      [id]: isChecked ? price : 0,
    }));
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Apri ticket</h2>
              <form onSubmit={handleApriTicket}>
                <div className="row">
                  <div className="col">
                    <div className="mb-3">
                      <label htmlFor="cellulareCliente" className="form-label">
                        Cellulare cliente
                      </label>
                      <input
                        type="text"
                        className="form-control shadow"
                        id="cellulareCliente"
                        value={cellulareCliente}
                        onChange={(e) => setCellulareCliente(e.target.value)}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="brandDispositivo" className="form-label">
                        Brand dispositivo
                      </label>
                      <select
                        className="form-select shadow"
                        value={selectedBrand}
                        onChange={(e) => setSelectedBrand(e.target.value)}
                        required
                      >
                        <option value="">Seleziona il brand</option>
                        {devicesData.map((device) => (
                          <option key={device.brand} value={device.brand}>
                            {device.brand}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="modello" className="form-label">
                        Modello
                      </label>
                      <select
                        className="form-select shadow"
                        value={selectedModel}
                        onChange={(e) => setSelectedModel(e.target.value)}
                        required
                      >
                        <option value="">Seleziona il modello</option>
                        {selectedBrand &&
                          devicesData
                            .find((d) => d.brand === selectedBrand)
                            ?.models.map((model) => (
                              <option key={model.model} value={model.model}>
                                {model.model}
                              </option>
                            ))}
                      </select>
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="descrizioneProblema"
                        className="form-label"
                      >
                        Descrizione del problema
                      </label>
                      <textarea
                        className="form-control shadow"
                        style={{ height: "200px" }}
                        id="descrizioneProblema"
                        value={descrizioneProblema}
                        onChange={(e) => setDescrizioneProblema(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  {selectedBrand &&
                    selectedModel &&
                    availableServices.length > 0 && (
                      <div className="col">
                        <div className="mb-3">
                          <label className="form-label">
                            Seleziona Servizi
                          </label>
                          {availableServices.map((service) => (
                            <div className="form-check mb-3" key={service.id}>
                              <input
                                className="form-check-input shadow"
                                type="checkbox"
                                id={`service-${service.id}`}
                                onChange={(e) =>
                                  handleServiceChange(
                                    service.id,
                                    service.price,
                                    e.target.checked
                                  )
                                }
                              />
                              <label
                                className="form-check-label"
                                htmlFor={`service-${service.id}`}
                              >
                                {service.name} (+€{service.price})
                              </label>
                            </div>
                          ))}
                          <div className="mb-3 mt-3">
                            <label
                              htmlFor="totaleStimato"
                              className="form-label"
                            >
                              Totale stimato: €{totaleStimato}
                            </label>
                          </div>
                        </div>
                      </div>
                    )}
                </div>
                <div className="d-grid gap-2">
                  <button type="submit" className="btn btn-primary">
                    Apri ticket
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApriTicket;
