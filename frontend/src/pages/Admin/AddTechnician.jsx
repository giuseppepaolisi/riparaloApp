import React, { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { Grid } from "@mui/material";
import { addTecnico } from "../../api/apiTecnico";
import FormInput from "../../components/FormInput";
import FormActions from "../../components/FormActions";
import FormContainer from "../../components/FormContainer";
import CustomAlert from "../../components/Alert/CustomAlert";
import usePageTitle from "../../CustomHooks/usePageTItle";

const AddTechnician = () => {
  usePageTitle("Aggiungi Tecnico");
  const [cognome, setCognome] = useState("");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const { token } = useSelector((state) => state.auth);

  const handleAggiungiTecnico = useCallback(
    async (event) => {
      event.preventDefault();

      const nuovoTecnico = { cognome, nome, email, password };

      try {
        const response = await addTecnico(token, nuovoTecnico);
        console.log("Nuovo tecnico aggiunto:", response.user);

        setCognome("");
        setNome("");
        setEmail("");
        setPassword("");
        setSuccess("Tecnico aggiunto con successo");
      } catch (error) {
        console.error("Errore durante l'aggiunta del tecnico:", error);
        setError(error.message);
      }
    },
    [cognome, nome, email, password, token]
  );

  useEffect(() => {
    document.body.style.backgroundColor = "#007bff";
    return () => {
      document.body.style.backgroundColor = null;
    };
  }, []);

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
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormInput
              label="Nome"
              id="nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
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
