import React, { useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";
import { addTecnico } from "../../api/apiAdmin";
import FormInput from "../../components/Form/FormInput";
import FormActions from "../../components/Form/FormActions";
import FormContainer from "../../components/Form/FormContainer";
import CustomAlert from "../../components/Alert/CustomAlert";
import usePageTitle from "../../CustomHooks/usePageTitle";
import useBodyBackgroundColor from "../../CustomHooks/useBodyBackgroundColor";

const AddTechnician = () => {
  usePageTitle("Aggiungi Tecnico");
  useBodyBackgroundColor("#007bff");
  const [cognome, setCognome] = useState("");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleAggiungiTecnico = useCallback(
    async (event) => {
      event.preventDefault();
      setError(null);
      setSuccess(null);

      const nuovoTecnico = { cognome, nome, email, password };

      try {
        console.log("Dati inviati al server:", nuovoTecnico);
        const response = await addTecnico(token, nuovoTecnico);
        console.log("Nuovo tecnico aggiunto:", response.user);

        setCognome("");
        setNome("");
        setEmail("");
        setPassword("");
        setSuccess("Tecnico aggiunto con successo");
        setTimeout(() => {
          navigate("/tecnici");
        }, 1000);
      } catch (error) {
        console.error("Errore durante l'aggiunta del tecnico:", error);
        setError(error.message);
      }
    },
    [cognome, nome, email, password, token, navigate]
  );

  return (
    <React.Fragment>
      <FormContainer title="Aggiungi Tecnico">
        {error && <CustomAlert msg={error} severity="error" />}
        {success && <CustomAlert msg={success} severity="success" />}
        <form onSubmit={handleAggiungiTecnico} style={{ marginTop: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <FormInput
                label="Cognome"
                id="cognome"
                value={cognome}
                onChange={(e) => setCognome(e.target.value)}
                required
                type="text"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormInput
                label="Nome"
                id="nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
                type="text"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormInput
                label="Email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormInput
                label="Password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                required
              />
            </Grid>
          </Grid>
          <FormActions onSubmit={handleAggiungiTecnico} />
        </form>
      </FormContainer>
    </React.Fragment>
  );
};

export default AddTechnician;
