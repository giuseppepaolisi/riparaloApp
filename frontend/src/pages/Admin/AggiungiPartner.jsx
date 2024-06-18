import { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";
import { addPartner } from "../../api/apiPartner"; // Importa la funzione API
import FormInput from "../../components/FormInput";
import FormActions from "../../components/FormActions";
import FormContainer from "../../components/FormContainer";
import CustomAlert from "../../components/Alert/CustomAlert";

const AggiungiPartner = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    nome: "",
    cognome: "",
    telefono: "",
    ragioneSociale: "",
    partitaIVA: "",
    codiceUnivoco: "",
    pec: "",
    cap: "",
    via: "",
    provincia: "",
    role: "partner", // Imposta il ruolo come partner
  });
  const [error, setError] = useState(null); // Stato per gestire eventuali errori
  const [success, setSuccess] = useState(null); // Stato per gestire il successo

  const { token } = useSelector((state) => state.auth); // Ottieni il token dallo stato Redux
  const navigate = useNavigate(); // Usa il hook useNavigate per la navigazione

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
      console.log("Dati inviati al server:", formData); // Log dei dati inviati
      const response = await addPartner(token, formData); // Passa il token come primo argomento
      console.log("Risposta del server:", response); // Log della risposta del server
      setSuccess("Partner aggiunto con successo");
      setTimeout(() => navigate("/partner"), 2000); // Naviga alla pagina partner dopo 2 secondi
    } catch (error) {
      console.error("Errore durante l'aggiunta del partner:", error); // Log degli errori
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
              label="Nome"
              id="nome"
              value={formData.nome}
              onChange={handleChange}
              type="text"
              required
            />
            <FormInput
              label="Cognome"
              id="cognome"
              value={formData.cognome}
              onChange={handleChange}
              type="text"
              required
            />
            <FormInput
              label="Email"
              id="email"
              value={formData.email}
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
            <FormInput
              label="Ragione Sociale"
              id="ragioneSociale"
              value={formData.ragioneSociale}
              onChange={handleChange}
              type="text"
              required
            />
            <FormInput
              label="Partita IVA"
              id="partitaIVA"
              value={formData.partitaIVA}
              onChange={handleChange}
              type="text"
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormInput
              label="Codice Univoco"
              id="codiceUnivoco"
              value={formData.codiceUnivoco}
              onChange={handleChange}
              type="text"
              required
            />
            <FormInput
              label="PEC"
              id="pec"
              value={formData.pec}
              onChange={handleChange}
              type="email"
              required
            />
            <FormInput
              label="CAP"
              id="cap"
              value={formData.cap}
              onChange={handleChange}
              type="text"
              required
            />
            <FormInput
              label="Via"
              id="via"
              value={formData.via}
              onChange={handleChange}
              type="text"
              required
            />
            <FormInput
              label="Provincia"
              id="provincia"
              value={formData.provincia}
              onChange={handleChange}
              type="text"
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
