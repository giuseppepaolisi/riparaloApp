import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState, useCallback } from "react";
import FormInput from "../../components/FormInput";

const AggiungiPartner = () => {
  const [formData, setFormData] = useState({
    ragioneSociale: "",
    rappresentanteLegale: "",
    codiceUnivoco: "",
    partitaIVA: "",
    PEC: "",
    telefono: "",
    citta: "",
    via: "",
    cap: "",
    provincia: "",
    user: "",
    password: "",
  });

  const handleChange = useCallback((e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  }, []);

  const handleAggiungiPartner = (event) => {
    event.preventDefault();
    // Aggiungi logica per aggiungere partner
  };

  useEffect(() => {
    document.body.style.backgroundColor = "#007bff";
    return () => {
      document.body.style.backgroundColor = null;
    };
  }, []);

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Aggiungi Partner</h2>
              <form onSubmit={handleAggiungiPartner}>
                <div className="row">
                  <div className="col">
                    <FormInput
                      label="Ragione Sociale"
                      type="text"
                      value={formData.ragioneSociale}
                      onChange={handleChange}
                      id="ragioneSociale"
                      required
                    />
                    <FormInput
                      label="Rappresentante Legale"
                      type="text"
                      value={formData.rappresentanteLegale}
                      onChange={handleChange}
                      id="rappresentanteLegale"
                      required
                    />
                    <FormInput
                      label="Codice Univoco"
                      type="text"
                      value={formData.codiceUnivoco}
                      onChange={handleChange}
                      id="codiceUnivoco"
                      required
                    />
                    <FormInput
                      label="Partita IVA"
                      type="text"
                      value={formData.partitaIVA}
                      onChange={handleChange}
                      id="partitaIVA"
                      required
                    />
                    <FormInput
                      label="PEC"
                      type="email"
                      value={formData.PEC}
                      onChange={handleChange}
                      id="PEC"
                      required
                    />
                    <FormInput
                      label="Telefono"
                      type="tel"
                      value={formData.telefono}
                      onChange={handleChange}
                      id="telefono"
                      required
                    />
                  </div>
                  <div className="col">
                    <FormInput
                      label="Città"
                      type="text"
                      value={formData.citta}
                      onChange={handleChange}
                      id="citta"
                      required
                    />
                    <FormInput
                      label="Via"
                      type="text"
                      value={formData.via}
                      onChange={handleChange}
                      id="via"
                      required
                    />
                    <FormInput
                      label="CAP"
                      type="text"
                      value={formData.cap}
                      onChange={handleChange}
                      id="cap"
                      required
                    />
                    <FormInput
                      label="Provincia"
                      type="text"
                      value={formData.provincia}
                      onChange={handleChange}
                      id="provincia"
                      required
                    />
                    <FormInput
                      label="User"
                      type="text"
                      value={formData.user}
                      onChange={handleChange}
                      id="user"
                      required
                    />
                    <FormInput
                      label="Password"
                      type="password"
                      value={formData.password}
                      onChange={handleChange}
                      id="password"
                      required
                    />
                  </div>
                </div>
                <div className="d-grid gap-2">
                  <button type="submit" className="btn btn-primary">
                    Aggiungi Partner
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

export default AggiungiPartner;
