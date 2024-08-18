import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Grid, Box, TextField, Button } from "@mui/material";
import CustomAlert from "../../components/Alert/CustomAlert";
import FormContainer from "../../components/Form/FormContainer";
import usePageTitle from "../../CustomHooks/usePageTitle";
import { fetchDevice, updateDevice } from "../../api/apiAdmin";
import useBodyBackgroundColor from "../../CustomHooks/useBodyBackgroundColor";

const EditDevice = () => {
  usePageTitle("Modifica Dispositivo");
  useBodyBackgroundColor("#007bff");
  const { id } = useParams();
  const { token } = useSelector((state) => state.auth);
  const [modello, setModello] = useState("");
  const [marca, setMarca] = useState("");
  const [servizi, setServizi] = useState([{ servizio: "", prezzo: "" }]);
  const [alert, setAlert] = useState({ open: false, msg: "", severity: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const loadDevice = async () => {
      try {
        const data = await fetchDevice(token, id);
        setModello(data.device.modello);
        setMarca(data.device.marca);
        setServizi(data.device.servizi);
      } catch (error) {
        console.error(error.message);
        setAlert({
          open: true,
          msg: "Errore nel caricamento del dispositivo",
          severity: "error",
        });
      }
    };
    loadDevice();
  }, [id, token]);

  const handleServizioChange = (index, event) => {
    const values = [...servizi];
    values[index][event.target.name] = event.target.value;
    setServizi(values);
  };

  const handleAddServizio = () => {
    setServizi([...servizi, { servizio: "", prezzo: "" }]);
  };

  const handleRemoveServizio = (index) => {
    const values = [...servizi];
    values.splice(index, 1);
    setServizi(values);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = {
      modello,
      marca,
      servizi: servizi.map((servizio) => ({
        servizio: servizio.servizio,
        prezzo: Number(servizio.prezzo),
      })),
    };

    try {
      await updateDevice(token, id, formData);
      setAlert({
        open: true,
        msg: "Dispositivo modificato con successo",
        severity: "success",
      });
      setTimeout(() => {
        navigate("/modelli");
      }, 1000);
    } catch (error) {
      console.error(error.message);
      setAlert({
        open: true,
        msg: error.message,
        severity: "error",
      });
    }
  };

  const handleCancel = () => {
    navigate("/modelli");
  };

  return (
    <React.Fragment>
      <FormContainer title="Modifica Dispositivo">
        {alert.open && (
          <CustomAlert msg={alert.msg} severity={alert.severity} />
        )}
        <form onSubmit={handleSubmit} style={{ marginTop: 1 }}>
          <Grid container spacing={2} alignItems="flex-end">
            <Grid item xs={12} sm={6}>
              <TextField
                label="Marca"
                id="marca"
                name="marca"
                value={marca}
                onChange={(e) => setMarca(e.target.value)}
                fullWidth
                required
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Modello"
                type="text"
                id="modello"
                name="modello"
                value={modello}
                onChange={(e) => setModello(e.target.value)}
                fullWidth
                required
                variant="outlined"
              />
            </Grid>
          </Grid>
          {servizi.map((servizio, index) => (
            <Box key={index} sx={{ my: 3 }}>
              <Grid container spacing={2} alignItems="flex-end">
                <Grid item xs={12} sm={5}>
                  <TextField
                    label="Servizio"
                    type="text"
                    id={`servizio-${index}`}
                    name="servizio"
                    value={servizio.servizio}
                    onChange={(e) => handleServizioChange(index, e)}
                    fullWidth
                    required
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    label="Prezzo"
                    type="number"
                    id={`prezzo-${index}`}
                    name="prezzo"
                    value={servizio.prezzo}
                    onChange={(e) => handleServizioChange(index, e)}
                    fullWidth
                    required
                    variant="outlined"
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={3}
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleRemoveServizio(index)}
                  >
                    - Rimuovi
                  </Button>
                </Grid>
              </Grid>
            </Box>
          ))}
          <Grid container justifyContent="center">
            <Grid item>
              <Button
                variant="contained"
                onClick={handleAddServizio}
                sx={{ mb: 3 }}
              >
                + Aggiungi Servizio
              </Button>
            </Grid>
          </Grid>
          <Grid container justifyContent="center" spacing={2}>
            <Grid item>
              <Button
                variant="contained"
                color="success"
                type="submit"
                sx={{ mb: 3 }}
              >
                Invia
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="inherit"
                onClick={handleCancel}
                sx={{ mb: 3 }}
              >
                Annulla
              </Button>
            </Grid>
          </Grid>
        </form>
      </FormContainer>
    </React.Fragment>
  );
};

export default EditDevice;
