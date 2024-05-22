import "bootstrap/dist/css/bootstrap.min.css";

import { useEffect, useState } from "react";

const AggiungiPartner = () => {
  const [ragioneSociale, setRagioneSociale] = useState("");
  const [rappresentanteLegale, setRappresentanteLegale] = useState("");
  const [codiceUnivoco, setCodiceUnivoco] = useState("");
  const [partitaIVA, setPartitaIVA] = useState("");
  const [PEC, setPEC] = useState("");
  const [telefono, setTelefono] = useState("");

  const [citta, setCitta] = useState("");
  const [via, setVia] = useState("");
  const [cap, setCap] = useState("");
  const [provincia, setProvincia] = useState("");
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  const handleAggiungiPartner = (event) => {
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
              <h2 className="card-title text-center mb-4">Aggiungi Partner</h2>
              <form onSubmit={handleAggiungiPartner}>
                <div className="row">
                  <div className="col">
                    <div className="mb-3">
                      <label htmlFor="ragioneSociale" className="form-label">
                        Ragione Sociale
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="ragioneSociale"
                        value={ragioneSociale}
                        onChange={(e) => setRagioneSociale(e.target.value)}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="rappresentanteLegale"
                        className="form-label"
                      >
                        Rappresentante Legale
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="rappresentanteLegale"
                        value={rappresentanteLegale}
                        onChange={(e) =>
                          setRappresentanteLegale(e.target.value)
                        }
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="codiceUnivoco" className="form-label">
                        Codice Univoco
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="codiceUnivoco"
                        value={codiceUnivoco}
                        onChange={(e) => setCodiceUnivoco(e.target.value)}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="partitaIVA" className="form-label">
                        Partita IVA
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="partitaIVA"
                        value={partitaIVA}
                        onChange={(e) => setPartitaIVA(e.target.value)}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="PEC" className="form-label">
                        PEC
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="PEC"
                        value={PEC}
                        onChange={(e) => setPEC(e.target.value)}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="telefono" className="form-label">
                        Telefono
                      </label>
                      <input
                        type="tel"
                        className="form-control"
                        id="telefono"
                        value={telefono}
                        onChange={(e) => setTelefono(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="col">
                    <div className="mb-3">
                      <label htmlFor="citta" className="form-label">
                        Città
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="citta"
                        value={citta}
                        onChange={(e) => setCitta(e.target.value)}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="via" className="form-label">
                        Via
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="via"
                        value={via}
                        onChange={(e) => setVia(e.target.value)}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="cap" className="form-label">
                        CAP
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="cap"
                        value={cap}
                        onChange={(e) => setCap(e.target.value)}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="provincia" className="form-label">
                        Provincia
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="provincia"
                        value={provincia}
                        onChange={(e) => setProvincia(e.target.value)}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="user" className="form-label">
                        User
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="user"
                        value={user}
                        onChange={(e) => setUser(e.target.value)}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="password" className="form-label">
                        Password
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
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
