import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import FormInput from "./FormInput";
import useBodyBackgroundColor from "../CustomHooks/useBodyBackgroundColor";

const DettagliUtente = ({ fetchUserById, updateUser }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [nome, setNome] = useState("");
  const [cognome, setCognome] = useState("");
  const [nuovaPassword, setNuovaPassword] = useState("");
  const [extraFields, setExtraFields] = useState({});
  const [error, setError] = useState(null);

  const { token } = useSelector((state) => state.auth);

  // Imposta il colore di sfondo
  useBodyBackgroundColor("#007bff");

  const loadUser = useCallback(async () => {
    if (!token || !id) return;
    try {
      const user = await fetchUserById(token, id);
      setEmail(user.email);
      setNome(user.nome);
      setCognome(user.cognome);
      setExtraFields(user.extraFields || {});
    } catch (error) {
      console.error(error.message);
      setError(error.message);
    }
  }, [token, id, fetchUserById]);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  const handleUpdateUser = useCallback(
    async (event) => {
      event.preventDefault();

      const updatedUser = {
        email,
        nome,
        cognome,
        ...extraFields,
      };

      if (nuovaPassword) {
        updatedUser.nuovaPassword = nuovaPassword;
      }

      try {
        const response = await updateUser(token, id, updatedUser);
        console.log("Utente aggiornato:", response.user);

        setError(null);
        navigate(-1); // Torna indietro
      } catch (error) {
        console.error("Errore durante l'aggiornamento dell'utente:", error);
        setError(error.message);
      }
    },
    [
      email,
      nome,
      cognome,
      nuovaPassword,
      extraFields,
      token,
      id,
      updateUser,
      navigate,
    ]
  );

  const handleExtraFieldChange = (field) => (event) => {
    setExtraFields((prevFields) => ({
      ...prevFields,
      [field]: event.target.value,
    }));
  };

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div className="container mt-3 mb-4">
      <div className="card">
        <div className="card-body">
          <h2 className="card-title text-center mb-4">Dettagli utente</h2>
          <form onSubmit={handleUpdateUser}>
            <div className="row">
              <div className="col-md-6">
                <FormInput
                  label="Email"
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
              </div>
              <div className="col-md-6">
                <FormInput
                  label="Cognome"
                  type="text"
                  id="cognome"
                  value={cognome}
                  onChange={(e) => setCognome(e.target.value)}
                  required
                />
                <FormInput
                  label="Nuova Password"
                  type="password"
                  id="nuovaPassword"
                  value={nuovaPassword}
                  onChange={(e) => setNuovaPassword(e.target.value)}
                />
                {Object.entries(extraFields).map(([field, value]) => (
                  <FormInput
                    key={field}
                    label={field.charAt(0).toUpperCase() + field.slice(1)}
                    type="text"
                    id={field}
                    value={value}
                    onChange={handleExtraFieldChange(field)}
                  />
                ))}
              </div>
            </div>
            <div className="d-flex justify-content-center mt-4">
              <button
                type="button"
                className="btn btn-secondary me-2"
                onClick={() => navigate(-1)}
              >
                Annulla
              </button>
              <button type="submit" className="btn btn-primary">
                Salva modifiche
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

DettagliUtente.propTypes = {
  fetchUserById: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired,
};

export default DettagliUtente;
