import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useCallback, useMemo } from "react";
import { addCliente } from "./apiPartner";
import FormInput from "../../components/FormInput";

const AggiungiCliente = () => {
  const [email, setEmail] = useState("");
  const [nome, setNome] = useState("");
  const [cognome, setCognome] = useState("");
  const [telefono, setTelefono] = useState("");

  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleAggiungiCliente = useCallback(
    async (event) => {
      event.preventDefault();
      if (!token) return;

      try {
        const newCustomer = { email, nome, cognome, telefono };
        const data = await addCliente(token, newCustomer);
        console.log("Cliente registrato con successo", data);
        navigate("/clienti");
      } catch (error) {
        console.error(error.message);
      }
    },
    [email, nome, cognome, telefono, token, navigate]
  );

  useEffect(() => {
    document.body.style.backgroundColor = "#007bff";
    return () => {
      document.body.style.backgroundColor = null;
    };
  }, []);

  const formFields = useMemo(
    () => [
      {
        id: "email",
        label: "Email",
        type: "email",
        value: email,
        onChange: setEmail,
      },
      {
        id: "nome",
        label: "Nome",
        type: "text",
        value: nome,
        onChange: setNome,
      },
      {
        id: "cognome",
        label: "Cognome",
        type: "text",
        value: cognome,
        onChange: setCognome,
      },
      {
        id: "telefono",
        label: "Telefono",
        type: "tel",
        value: telefono,
        onChange: setTelefono,
      },
    ],
    [email, nome, cognome, telefono]
  );

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Aggiungi Cliente</h2>
              <form onSubmit={handleAggiungiCliente}>
                {formFields.map(({ id, label, type, value, onChange }) => (
                  <FormInput
                    key={id}
                    id={id}
                    label={label}
                    type={type}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    required
                  />
                ))}
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
