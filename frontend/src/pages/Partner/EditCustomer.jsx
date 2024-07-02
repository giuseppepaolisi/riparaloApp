import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { fetchClienteById, updateCliente } from "../../api/apiPartner";
import { TextField, Button, Container, Typography, Box, Grid } from "@mui/material";
import Loading from "../../components/Loading";
import CustomAlert from "../../components/Alert/CustomAlert";
import usePageTitle from "../../CustomHooks/usePageTitle";
import { validatePhoneNumber, validateEmail, validateName } from "../../utils/validationUtils";
import { handleValidationError } from "../../utils/errorHandling";
import useFormFields from "../../CustomHooks/useFormFields";

const EditCustomer = () => {
  usePageTitle("Modifica Cliente");

  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);

  const [fields, setField] = useFormFields({
    nome: "",
    cognome: "",
    email: "",
    telefono: "",
  });
  
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState({ open: false, msg: "", severity: "" });

  useEffect(() => {
    const loadCliente = async () => {
      try {
        const clienteData = await fetchClienteById(token, id);
        setField("nome")(clienteData.nome);
        setField("cognome")(clienteData.cognome);
        setField("email")(clienteData.email);
        setField("telefono")(clienteData.telefono);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setAlert({
          open: true,
          msg: "Errore nel caricamento del cliente",
          severity: "error",
        });
        setLoading(false);
      }
    };

    if (token) {
      loadCliente();
    }
  }, [token, id, setField]);

  const handleKeyPress = (e) => {
    if (!/[0-9+]/.test(e.key)) {
      e.preventDefault();
    }
  };

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      if (
        handleValidationError(validatePhoneNumber, fields.telefono, "Numero di telefono non valido", setAlert) ||
        handleValidationError(validateName, fields.nome, "Nome non valido", setAlert) ||
        handleValidationError(validateName, fields.cognome, "Cognome non valido", setAlert) ||
        handleValidationError(validateEmail, fields.email, "Email non valida", setAlert)
      ) {
        return;
      }

      try {
        await updateCliente(token, id, fields);
        setAlert({
          open: true,
          msg: "Cliente aggiornato con successo",
          severity: "success",
        });
        setTimeout(() => {
          navigate("/clienti");
        }, 1000);
      } catch (error) {
        console.error(error);
        setAlert({
          open: true,
          msg: "Errore nell'aggiornamento del cliente",
          severity: "error",
        });
      }
    },
    [fields, token, id, navigate]
  );

  const handleCancel = () => {
    navigate("/clienti");
  };

  if (loading) return <Loading open={loading} />;

  return (
    <React.Fragment>
      <Container component="main" maxWidth="xs">
        <Box mt={8} display="flex" flexDirection="column" alignItems="center">
          <Typography component="h1" variant="h5">
            Modifica Cliente
          </Typography>
          <form onSubmit={handleSubmit} style={{ marginTop: 1 }}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="nome"
              label="Nome"
              name="nome"
              autoComplete="nome"
              autoFocus
              value={fields.nome}
              onChange={(e) => setField("nome")(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="cognome"
              label="Cognome"
              name="cognome"
              autoComplete="cognome"
              value={fields.cognome}
              onChange={(e) => setField("cognome")(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              value={fields.email}
              onChange={(e) => setField("email")(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="telefono"
              label="Telefono"
              name="telefono"
              autoComplete="telefono"
              value={fields.telefono}
              onChange={(e) => setField("telefono")(e.target.value)}
              inputProps={{ pattern: "^\\+?[0-9]{10,13}$" }}
              onKeyPress={handleKeyPress}
            />
            <Grid container spacing={2} sx={{ mt: 3 }}>
              <Grid item xs={6}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                >
                  Salva
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  fullWidth
                  variant="outlined"
                  color="secondary"
                  onClick={handleCancel}
                >
                  Annulla
                </Button>
              </Grid>
            </Grid>
          </form>
          {alert.open && (
            <CustomAlert msg={alert.msg} severity={alert.severity} />
          )}
        </Box>
      </Container>
    </React.Fragment>
  );
};

export default EditCustomer;
