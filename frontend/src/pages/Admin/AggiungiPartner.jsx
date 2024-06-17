import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";
import { addPartner } from "../../api/apiPartner"; // Importa la funzione API
import FormInput from "../../components/FormInput";
import FormActions from "../../components/FormActions";
import FormContainer from "../../components/FormContainer";
import CustomAlert from "../../components/Alert/CustomAlert";

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
  const [error, setError] = useState(null); // Stato per gestire eventuali errori
  const [success, setSuccess] = useState(null); // Stato per gestire il successo
  const navigate = useNavigate(); // Per la navigazione

  const handleChange = useCallback((e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  }, []);

  const handleAggiungiPartner = async (event) => {
    event.preventDefault();
    setError(null); // Resetta lo stato dell'errore
    setSuccess(null); // Resetta lo stato del successo
    try {
      await addPartner(formData);
      setSuccess("Partner aggiunto con successo");
      setTimeout(() => navigate("/partner"), 2000); // Naviga alla pagina partner dopo 2 secondi
    } catch (error) {
      setError(error.message); // Imposta il messaggio di errore
    }
  };

  useEffect(() => {
    document.body.style.backgroundColor = "#007bff";
    return () => {
      document.body.style.backgroundColor = null;
    };
  }, []);

  return (
    <FormContainer title="Aggiungi Partner">
      {error && <CustomAlert msg={error} severity="error" />}
      {success && <CustomAlert msg={success} severity="success" />}
      <form onSubmit={handleAggiungiPartner} style={{ marginTop: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <FormInput
              label="Ragione Sociale"
              id="ragioneSociale"
              value={formData.ragioneSociale}
              onChange={handleChange}
              required
            />
            <FormInput
              label="Rappresentante Legale"
              id="rappresentanteLegale"
              value={formData.rappresentanteLegale}
              onChange={handleChange}
              required
            />
            <FormInput
              label="Codice Univoco"
              id="codiceUnivoco"
              value={formData.codiceUnivoco}
              onChange={handleChange}
              required
            />
            <FormInput
              label="Partita IVA"
              id="partitaIVA"
              value={formData.partitaIVA}
              onChange={handleChange}
              required
            />
            <FormInput
              label="PEC"
              id="PEC"
              value={formData.PEC}
              onChange={handleChange}
              type="email"
              required
            />
            <FormInput
              label="Telefono"
              id="telefono"
              value={formData.telefono}
              onChange={handleChange}
              type="tel"
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormInput
              label="Città"
              id="citta"
              value={formData.citta}
              onChange={handleChange}
              required
            />
            <FormInput
              label="Via"
              id="via"
              value={formData.via}
              onChange={handleChange}
              required
            />
            <FormInput
              label="CAP"
              id="cap"
              value={formData.cap}
              onChange={handleChange}
              required
            />
            <FormInput
              label="Provincia"
              id="provincia"
              value={formData.provincia}
              onChange={handleChange}
              required
            />
            <FormInput
              label="User"
              id="user"
              value={formData.user}
              onChange={handleChange}
              required
            />
            <FormInput
              label="Password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              type="password"
              required
            />
          </Grid>
        </Grid>
        <FormActions onSubmit={handleAggiungiPartner} />
      </form>
    </FormContainer>
  );
};

export default AggiungiPartner;
