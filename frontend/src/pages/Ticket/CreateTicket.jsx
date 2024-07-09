import React, { useState, useCallback, useMemo } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  Box,
  Typography,
  Checkbox,
  FormControlLabel,
  TextField,
  Autocomplete,
} from "@mui/material";
import FormContainer from "../../components/FormContainer";
import FormInput from "../../components/FormInput";
import FormActions from "../../components/FormActions";
import CustomAlert from "../../components/Alert/CustomAlert";
import usePageTitle from "../../CustomHooks/usePageTitle";
import useBodyBackgroundColor from "../../CustomHooks/useBodyBackgroundColor";
import {
  validatePhoneNumber,
  validateIMEI,
  validatePrice,
  validateDeposit,
  validateName,
} from "../../utils/validationUtils";
import { handleValidationError } from "../../utils/errorHandling";
import useFormFields from "../../CustomHooks/useFormFields";
import { formFieldsConfig } from "../../utils/formConfig";
import { handleTicketCreate } from "../../utils/ticketUtils";
import {
  fetchBrands,
  fetchModelsByBrand,
  fetchServicesByDevice,
  fetchCustomerByPhone,
} from "../../api/apiAdmin";

const CreateTicket = () => {
  useBodyBackgroundColor("#007bff");
  usePageTitle("Apri Ticket");

  const [fields, setField] = useFormFields({
    telefono_cliente: "",
    nome_cliente: "",
    cognome_cliente: "",
    descrizione_problema: "",
    marca: "",
    modello: "",
    servizi: [],
    acconto: "10",
    imei: "",
    pin: "",
    seriale: "",
  });

  const [alert, setAlert] = useState({ open: false, msg: "", severity: "" });
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [brandSuggestions, setBrandSuggestions] = useState([]);
  const [modelSuggestions, setModelSuggestions] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [servicesList, setServicesList] = useState([]);

  const handleServiceChange = (e, service) => {
    const isChecked = e.target.checked;
    const updatedServices = isChecked
      ? [...fields.servizi, service]
      : fields.servizi.filter((s) => s.servizio !== service.servizio);

    setField("servizi")(updatedServices);
  };

  const handleKeyPress = (e) => {
    if (!/[0-9]/.test(e.key)) {
      e.preventDefault();
    }
  };

  const handleTelefonoKeyPress = (e) => {
    if (!/[0-9+]/.test(e.key)) {
      e.preventDefault();
    }
  };

  const handlePhoneBlur = async () => {
    console.log("handlePhoneBlur called with phone:", fields.telefono_cliente);
    try {
      const customer = await fetchCustomerByPhone(
        token,
        fields.telefono_cliente
      );
      console.log("Customer retrieved:", customer);
      setField("nome_cliente")(customer.nome);
      setField("cognome_cliente")(customer.cognome);
    } catch (error) {
      console.error("Errore nel recupero del cliente:", error);
      setAlert({ open: true, msg: "Cliente non trovato", severity: "error" });
    }
  };

  const handlePhoneKeyDown = async (e) => {
    if (e.key === "Enter") {
      console.log("Enter key pressed"); // Debugging
      await handlePhoneBlur();
    }
  };

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setAlert({ open: false, msg: "", severity: "" });

      const {
        telefono_cliente,
        nome_cliente,
        cognome_cliente,
        imei,
        acconto,
        servizi,
      } = fields;

      const totalPrice = servizi.reduce(
        (acc, service) => acc + parseFloat(service.prezzo || 0),
        0
      );

      if (
        handleValidationError(
          validatePhoneNumber,
          telefono_cliente,
          "Numero di telefono non valido",
          setAlert
        ) ||
        handleValidationError(
          validateName,
          nome_cliente,
          "Nome cliente non valido",
          setAlert
        ) ||
        handleValidationError(
          validateName,
          cognome_cliente,
          "Cognome cliente non valido",
          setAlert
        ) ||
        handleValidationError(
          validateIMEI,
          imei,
          "IMEI non valido",
          setAlert
        ) ||
        handleValidationError(
          validatePrice,
          acconto,
          "Acconto non valido",
          setAlert
        ) ||
        handleValidationError(
          (deposit) => validateDeposit(deposit, totalPrice),
          acconto,
          "Acconto deve essere minore o uguale al totale dei servizi",
          setAlert
        )
      ) {
        return;
      }

      handleTicketCreate(fields, token, setAlert, navigate);
    },
    [fields, token, navigate, setAlert]
  );

  const formFields = useMemo(() => formFieldsConfig(fields, setField), [
    fields,
    setField,
  ]);

  const fetchBrandSuggestions = async (input) => {
    try {
      const brands = await fetchBrands(token);
      setBrandSuggestions(
        brands.filter((brand) =>
          brand.toLowerCase().includes(input.toLowerCase())
        )
      );
    } catch (error) {
      console.error("Error fetching brand suggestions:", error);
    }
  };

  const fetchModelSuggestions = async (brand, input) => {
    try {
      const models = await fetchModelsByBrand(token, brand);
      setModelSuggestions(
        models.filter((model) =>
          model.toLowerCase().includes(input.toLowerCase())
        )
      );
    } catch (error) {
      console.error("Error fetching model suggestions:", error);
    }
  };

  const fetchServices = async (device) => {
    try {
      const services = await fetchServicesByDevice(token, device);
      setServicesList(services);
    } catch (error) {
      console.error(
        `Errore nel recupero dei servizi per il dispositivo: ${device}`,
        error
      );
    }
  };

  const handleModelChange = async (brand, model) => {
    setField("marca")(brand);
    setField("modello")(model);
    //const device = `${brand} ${model}`.replace(" ", "%20");
    await fetchServices(model);
  };

  const totalPrice = fields.servizi.reduce(
    (acc, service) => acc + service.prezzo,
    0
  );

  return (
    <React.Fragment>
      <FormContainer
        title="Apri Ticket"
        maxWidth="lg"
        style={{
          maxWidth: "1200px",
          margin: "auto",
          backgroundColor: "#fff",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        }}
      >
        <form onSubmit={handleSubmit} style={{ marginTop: 1 }}>
          <Box sx={{ p: 3 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <Typography variant="h6" gutterBottom>
                  INFORMAZIONI CLIENTE
                </Typography>
                {formFields
                  .slice(0, 3)
                  .map(
                    ({
                      id,
                      label,
                      type,
                      value,
                      onChange,
                      required,
                      inputProps,
                    }) => (
                      <FormInput
                        key={id}
                        id={id}
                        label={label}
                        type={type}
                        value={value}
                        onChange={onChange}
                        required={required}
                        inputProps={inputProps}
                        onKeyPress={
                          id === "telefono_cliente"
                            ? handleTelefonoKeyPress
                            : null
                        }
                        onKeyDown={
                          id === "telefono_cliente" ? handlePhoneKeyDown : null
                        }
                        onBlur={
                          id === "telefono_cliente" ? handlePhoneBlur : null
                        }
                      />
                    )
                  )}
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography variant="h6" gutterBottom>
                  INFORMAZIONI DISPOSITIVO
                </Typography>
                <Autocomplete
                  freeSolo
                  options={brandSuggestions}
                  onInputChange={(e, value) => {
                    setField("marca")(value);
                    fetchBrandSuggestions(value);
                  }}
                  onChange={(e, value) => {
                    setSelectedBrand(value);
                    setField("marca")(value);
                    fetchModelSuggestions(value, "");
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Marca"
                      value={fields.marca}
                      onChange={(e) => setField("marca")(e.target.value)}
                      required
                      sx={{ marginTop: 2 }}
                    />
                  )}
                />
                <Autocomplete
                  freeSolo
                  options={modelSuggestions}
                  onInputChange={(e, value) => {
                    setField("modello")(value);
                    fetchModelSuggestions(selectedBrand, value);
                  }}
                  onChange={(e, value) =>
                    handleModelChange(selectedBrand, value)
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Modello"
                      value={fields.modello}
                      onChange={(e) => setField("modello")(e.target.value)}
                      required
                      sx={{ marginTop: 2 }}
                    />
                  )}
                />
                <FormInput
                  id="descrizione_problema"
                  label="Descrizione del problema"
                  type="text"
                  value={fields.descrizione_problema}
                  onChange={(e) =>
                    setField("descrizione_problema")(e.target.value)
                  }
                  required
                />
                <FormInput
                  id="imei"
                  label="IMEI"
                  type="text"
                  value={fields.imei}
                  onChange={(e) => setField("imei")(e.target.value)}
                  required
                  onKeyPress={handleKeyPress}
                />
                <FormInput
                  id="pin"
                  label="PIN"
                  type="text"
                  value={fields.pin}
                  onChange={(e) => setField("pin")(e.target.value)}
                  required
                  onKeyPress={handleKeyPress}
                />
                <FormInput
                  id="seriale"
                  label="Seriale"
                  type="text"
                  value={fields.seriale}
                  onChange={(e) => setField("seriale")(e.target.value)}
                  required
                  onKeyPress={handleKeyPress}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography variant="h6" gutterBottom>
                  SERVIZI OFFERTI PER QUESTO DISPOSITIVO
                </Typography>
                {servicesList.map((service) => (
                  <FormControlLabel
                    key={service.servizio}
                    control={
                      <Checkbox
                        checked={fields.servizi.some(
                          (s) => s.servizio === service.servizio
                        )}
                        onChange={(e) => handleServiceChange(e, service)}
                      />
                    }
                    label={`${service.servizio} - ${service.prezzo}€`}
                  />
                ))}
                <Typography variant="h6" gutterBottom>
                  Totale stimato: {totalPrice}€
                </Typography>
                <FormInput
                  id="acconto"
                  label="Acconto"
                  type="number"
                  value={fields.acconto}
                  onChange={(e) => setField("acconto")(e.target.value)}
                  required
                  inputProps={{ min: 0, step: "0.01" }}
                  onKeyPress={handleKeyPress}
                />
              </Grid>
            </Grid>
          </Box>
          <FormActions onSubmit={handleSubmit} />
        </form>
        {alert.open && (
          <CustomAlert
            msg={alert.msg}
            severity={alert.severity}
            onClose={() => setAlert({ ...alert, open: false })}
          />
        )}
      </FormContainer>
    </React.Fragment>
  );
};

export default CreateTicket;
