import React, { useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";
import { addPartner } from "../../api/apiAdmin";
import FormInput from "../../components/FormInput";
import FormActions from "../../components/FormActions";
import FormContainer from "../../components/FormContainer";
import CustomAlert from "../../components/Alert/CustomAlert";
import usePageTitle from "../../CustomHooks/usePageTitle";
import useBodyBackgroundColor from "../../CustomHooks/useBodyBackgroundColor";

const AddPartner = () => {
  usePageTitle("Aggiungi Partner");
  useBodyBackgroundColor("#007bff");

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
    role: "partner",
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleChange = useCallback((e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  }, []);

  const handleAggiungiPartner = async (event) => {
    event.preventDefault();
    setError(null);
    setSuccess(null);
    try {
      console.log("Dati inviati al server:", formData);
      const response = await addPartner(token, formData);
      console.log("Risposta del server:", response);
      setSuccess("Partner aggiunto con successo");
      setTimeout(() => {
        navigate("/partner");
      }, 1000);
    } catch (error) {
      console.error("Errore durante l'aggiunta del partner:", error);
      setError(error.message);
    }
  };

  return (
    <React.Fragment>
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
    </React.Fragment>
  );
};

export default AddPartner;
