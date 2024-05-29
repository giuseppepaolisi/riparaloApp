import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const AggiungiModello = () => {
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [services, setServices] = useState([]);
  const [newServiceName, setNewServiceName] = useState("");
  const [newServicePrice, setNewServicePrice] = useState("");

  useEffect(() => {
    document.body.style.backgroundColor = "#007bff";
    return () => {
      document.body.style.backgroundColor = null;
    };
  }, []);

  const addService = () => {
    if (newServiceName && newServicePrice) {
      setServices([
        ...services,
        { name: newServiceName, price: newServicePrice },
      ]);
      setNewServiceName("");
      setNewServicePrice("");
    }
  };

  const saveModel = () => {
    const modelData = {
      brand,
      model,
      services,
    };
    console.log("Saved Model Data:", modelData);
    setBrand("");
    setModel("");
    setServices([]);
  };

  const isSaveButtonDisabled = () => {
    return !(brand && model && services.length > 0);
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
                    <label htmlFor="brand" className="form-label">
                      Brand
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="brand"
                      value={brand}
                      onChange={(e) => setBrand(e.target.value)}
                      style={{ maxWidth: "300px" }}
                      required
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
                      value={model}
                      onChange={(e) => setModel(e.target.value)}
                      style={{ maxWidth: "300px" }}
                      required
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label htmlFor="serviceName" className="form-label">
                      Nome Servizio
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="serviceName"
                      value={newServiceName}
                      onChange={(e) => setNewServiceName(e.target.value)}
                      style={{ maxWidth: "300px" }}
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="servicePrice" className="form-label">
                      Prezzo Servizio
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="servicePrice"
                      value={newServicePrice}
                      onChange={(e) => setNewServicePrice(e.target.value)}
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
