import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { addCliente } from "./apiPartner";

const AggiungiCliente = () => {
  const [email, setEmail] = useState("");
  const [nome, setNome] = useState("");
  const [cognome, setCognome] = useState("");
  const [telefono, setTelefono] = useState("");

  const { token } = useSelector((state) => state.auth);
  let navigate = useNavigate();

  const handleAggiungiCliente = async (event) => {
    event.preventDefault();
    if (!token) {
      return;
    }
    try {
      const newCustomer = { email, nome, cognome, telefono };
      const data = await addCliente(token, newCustomer);
      console.log("Cliente registrato con successo", data);
      navigate("/clienti");
    } catch (error) {
      console.error(error.message);
    }
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
