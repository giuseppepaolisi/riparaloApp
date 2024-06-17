import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { fetchTecnicoById, updateTecnico } from "../../api/apiTecnico";
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

const ModificaTecnico = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);

  const [tecnico, setTecnico] = useState(null);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState({ open: false, msg: "", severity: "" });

  useEffect(() => {
    const loadTecnico = async () => {
      try {
        const tecnicoData = await fetchTecnicoById(token, id);
        setTecnico(tecnicoData);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setAlert({
          open: true,
          msg: "Errore nel caricamento del tecnico",
          severity: "error",
        });
        setLoading(false);
      }
    };

    if (token) {
      loadTecnico();
    }
  }, [token, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTecnico((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateTecnico(token, id, tecnico);
      setAlert({
        open: true,
        msg: "Tecnico aggiornato con successo",
        severity: "success",
      });
      navigate("/tecnici");
    } catch (error) {
      console.error(error);
      setAlert({
        open: true,
        msg: "Errore nell'aggiornamento del tecnico",
        severity: "error",
      });
    }
  };

  const handleCancel = () => {
    navigate("/tecnici");
  };

  if (loading) return <Loading open={loading} />;

  return (
    <Container component="main" maxWidth="xs">
      <Box mt={8} display="flex" flexDirection="column" alignItems="center">
        <Typography component="h1" variant="h5">
          Modifica Tecnico
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
            value={tecnico?.nome || ""}
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
            value={tecnico?.cognome || ""}
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
            value={tecnico?.email || ""}
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
  );
};

export default ModificaTecnico;
