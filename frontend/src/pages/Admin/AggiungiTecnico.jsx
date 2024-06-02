import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState, useCallback } from "react";
import FormInput from "../../components/FormInput";

const AggiungiTecnico = () => {
  const [cognome, setCognome] = useState("");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");

  const handleAggiungiTecnico = useCallback(
    (event) => {
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
    },
    [cognome, nome, email]
  );

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
                <FormInput
                  label="Cognome"
                  type="text"
                  id="cognome"
                  value={cognome}
                  onChange={(e) => setCognome(e.target.value)}
                  required
                />
                <FormInput
                  label="Nome"
                  type="text"
                  id="nome"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  required
                />
                <FormInput
                  label="Email"
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
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
