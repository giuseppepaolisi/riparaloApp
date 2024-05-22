import "bootstrap/dist/css/bootstrap.min.css";

import { useEffect, useState } from "react";

const AggiungiTecnico = () => {
  const [cognome, setCognome] = useState("");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");

  const handleAggiungiTecnico = (event) => {
    event.preventDefault();

    const nuovoTecnico = {
      cognome,
      nome,
      email,
    };

    console.log("Nuovo tecnico aggiunto:", nuovoTecnico);

    setCognome("");
    setNome("");
    setEmail("");
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
              <h2 className="card-title text-center mb-4">Aggiungi Tecnico</h2>
              <form onSubmit={handleAggiungiTecnico}>
                <div className="mb-3">
                  <label htmlFor="cognome" className="form-label">
                    Cognome
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="cognome"
                    value={cognome}
                    onChange={(e) => setCognome(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="nome" className="form-label">
                    Nome
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="d-grid gap-2">
                  <button type="submit" className="btn btn-primary">
                    Aggiungi Tecnico
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

export default AggiungiTecnico;
