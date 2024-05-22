import "bootstrap/dist/css/bootstrap.min.css";

import { useEffect, useState } from "react";

const AggiungiCliente = () => {
  const [nome, setNome] = useState("");
  const [cognome, setCognome] = useState("");
  const [cellulare, setCellulare] = useState("");

  const handleAggiungiCliente = (event) => {
    event.preventDefault();
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
              <h2 className="card-title text-center mb-4">Aggiungi Cliente</h2>
              <form onSubmit={handleAggiungiCliente}>
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
                  <label htmlFor="cellulare" className="form-label">
                    Cellulare
                  </label>
                  <input
                    type="tel"
                    className="form-control"
                    id="cellulare"
                    value={cellulare}
                    onChange={(e) => setCellulare(e.target.value)}
                    required
                  />
                </div>
                <div className="d-grid gap-2">
                  <button type="submit" className="btn btn-primary">
                    Aggiungi
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

export default AggiungiCliente;
