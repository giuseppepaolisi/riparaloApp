import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Grid, Box, TextField, Button, MenuItem } from "@mui/material";
import CustomAlert from "../../components/Alert/CustomAlert";
import smartphoneBrands from "../../assets/js/brands";
import FormActions from "../../components/FormActions";
import FormContainer from "../../components/FormContainer";
import usePageTitle from "../../CustomHooks/usePageTItle";
import { addDevice } from "../../api/apiAdmin";

smartphoneBrands.unshift("");

const AddDevice = () => {
  usePageTitle("Aggiungi Dispositivo");
  const { token } = useSelector((state) => state.auth);
  const [modello, setModello] = useState("");
  const [marca, setMarca] = useState("");
  const [servizi, setServizi] = useState([{ servizio: "", prezzo: "" }]);
  const [alert, setAlert] = useState({ open: false, msg: "", severity: "" });
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.backgroundColor = "#007bff";
    return () => {
      document.body.style.backgroundColor = null;
    };
  }, []);

  const handleChange = (e) => {
    const value = e.target.value;
    setMarca(value);
  };

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
      await addDevice(token, formData); // usa la funzione addDevice
      setAlert({
        open: true,
        msg: "Dispositivo aggiunto con successo",
        severity: "success",
      });
      navigate("/modelli");
    } catch (error) {
      console.error(error);
      setAlert({
        open: true,
        msg: error.message,
        severity: "error",
      });
    }
  };

  const isAddServizioDisabled = servizi.some(
    (servizio) => servizio.servizio === "" || servizio.prezzo === ""
  );

  return (
    <React.Fragment>
      <FormContainer title="Aggiungi Dispositivo">
        {alert.open && <CustomAlert msg={alert.msg} severity={alert.severity} />}
        <form onSubmit={handleSubmit} style={{ marginTop: 1 }}>
          <Grid container spacing={2} alignItems="flex-end">
            <Grid item xs={12} sm={6}>
              <TextField
                select
                label="Marca"
                id="marca"
                name="marca"
                value={marca}
                onChange={handleChange}
                fullWidth
                required
                variant="outlined"
              >
                {smartphoneBrands.map((brand, index) => (
                  <MenuItem
                    key={index}
                    value={brand}
                    disabled={brand === "" && marca !== ""}
                  >
                    {brand === "" ? "Seleziona una marca" : brand}
                  </MenuItem>
                ))}
              </TextField>
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
                    name={`servizio-${index}`}
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
                    name={`prezzo-${index}`}
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
                disabled={isAddServizioDisabled}
                sx={{ mb: 3 }}
              >
                + Aggiungi Servizio
              </Button>
            </Grid>
          </Grid>
          <FormActions onSubmit={handleSubmit} />
        </form>
      </FormContainer>
    </React.Fragment>
  );
};

export default AddDevice;
