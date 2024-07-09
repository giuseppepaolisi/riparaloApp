import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Grid, Box, TextField, Button, Autocomplete } from "@mui/material";
import CustomAlert from "../../components/Alert/CustomAlert";
import smartphoneBrands from "../../assets/js/brands";
import FormActions from "../../components/FormActions";
import FormContainer from "../../components/FormContainer";
import usePageTitle from "../../CustomHooks/usePageTitle";
import { addDevice } from "../../api/apiAdmin";
import useBodyBackgroundColor from "../../CustomHooks/useBodyBackgroundColor";

const AddDevice = () => {
  usePageTitle("Aggiungi Dispositivo");
  useBodyBackgroundColor("#007bff");
  const { token } = useSelector((state) => state.auth);
  const [modello, setModello] = useState("");
  const [marca, setMarca] = useState("");
  const [servizi, setServizi] = useState([{ servizio: "", prezzo: "" }]);
  const [alert, setAlert] = useState({ open: false, msg: "", severity: "" });
  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    console.log("New value:", newValue);
    setMarca(newValue || "");
  };

  const handleInputChange = (event) => {
    setMarca(event.target.value);
  };

  const handleServizioChange = (index, event) => {
    const values = [...servizi];
    const { name, value } = event.target;
    const field = name.split("-")[0];

    if (field === "prezzo") {
      const validValue = value.replace(/[^0-9]/g, "");
      values[index][field] = validValue;
    } else {
      values[index][field] = value;
    }

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
    console.log("Form submit event triggered");
    console.log("Marca:", marca);

    if (!marca) {
      setAlert({
        open: true,
        msg: "Inserisci una marca valida.",
        severity: "error",
      });
      return;
    }

    const formData = {
      modello,
      marca,
      servizi: servizi.map((servizio) => ({
        servizio: servizio.servizio,
        prezzo: Number(servizio.prezzo),
      })),
    };

    console.log("FormData inviato:", formData);

    try {
      await addDevice(token, formData);
      setAlert({
        open: true,
        msg: "Dispositivo aggiunto con successo",
        severity: "success",
      });
      setTimeout(() => {
        navigate("/modelli");
      }, 1000);
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

  const handleKeyDown = (e) => {
    if (["-", "+", "e"].includes(e.key)) {
      e.preventDefault();
    }
  };

  return (
    <React.Fragment>
      <FormContainer title="Aggiungi Dispositivo">
        {alert.open && (
          <CustomAlert msg={alert.msg} severity={alert.severity} />
        )}
        <form onSubmit={handleSubmit} style={{ marginTop: 1 }}>
          <Grid container spacing={2} alignItems="flex-end">
            <Grid item xs={12} sm={6}>
              <Autocomplete
                freeSolo
                options={smartphoneBrands}
                value={marca}
                onChange={handleChange}
                onInputChange={handleInputChange}
                onBlur={(e) => handleInputChange(e)}
                clearOnEscape
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Marca"
                    id="marca"
                    name="marca"
                    fullWidth
                    required
                    variant="outlined"
                  />
                )}
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
                    onKeyDown={handleKeyDown}
                    fullWidth
                    required
                    variant="outlined"
                    inputProps={{ min: "0" }}
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
          <FormActions
            onSubmit={handleSubmit}
            isSubmitDisabled={isAddServizioDisabled}
          />
        </form>
      </FormContainer>
    </React.Fragment>
  );
};

export default AddDevice;
