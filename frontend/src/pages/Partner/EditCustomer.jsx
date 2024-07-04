import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { fetchClienteById, updateCliente } from "../../api/apiPartner";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Grid,
} from "@mui/material";
import Loading from "../../components/Loading";
import CustomAlert from "../../components/Alert/CustomAlert";
import usePageTitle from "../../CustomHooks/usePageTitle";
import useBodyBackgroundColor from "../../CustomHooks/useBodyBackgroundColor";

const EditCustomer = () => {
  usePageTitle("Modifica Cliente");
  useBodyBackgroundColor("#007bff");

  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);

  const [cliente, setCliente] = useState(null);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState({ open: false, msg: "", severity: "" });

  useEffect(() => {
    const loadCliente = async () => {
      try {
        const clienteData = await fetchClienteById(token, id);
        setCliente(clienteData);
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
  }, [token, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCliente((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateCliente(token, id, cliente);
      setAlert({
        open: true,
        msg: "Cliente aggiornato con successo",
        severity: "success",
      });
      navigate("/clienti");
    } catch (error) {
      console.error(error);
      setAlert({
        open: true,
        msg: "Errore nell'aggiornamento del cliente",
        severity: "error",
      });
    }
  };

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
              value={cliente?.nome || ""}
              onChange={handleChange}
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
              value={cliente?.cognome || ""}
              onChange={handleChange}
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
              value={cliente?.email || ""}
              onChange={handleChange}
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
