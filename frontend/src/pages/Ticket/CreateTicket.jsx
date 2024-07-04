import React, { useState, useCallback, useMemo } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Grid, Box, Typography, Button } from "@mui/material";
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

const CreateTicket = () => {
  useBodyBackgroundColor("#007bff");
  usePageTitle("Apri Ticket");

  const [fields, setField] = useFormFields({
    nome_cliente: "",
    cognome_cliente: "",
    telefono_cliente: "",
    descrizione_problema: "",
    marca: "",
    modello: "",
    servizi: [{ servizio: "", prezzo: "" }],
    acconto: "",
    imei: "",
    pin: "",
    seriale: "",
  });

  const [alert, setAlert] = useState({ open: false, msg: "", severity: "" });
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleServiceChange = (index, e) => {
    const { id, value } = e.target;
    const newServices = fields.servizi.map((service, i) =>
      i === index ? { ...service, [id]: value } : service
    );
    setField("servizi")(newServices);
  };

  const addService = () => {
    setField("servizi")([...fields.servizi, { servizio: "", prezzo: "" }]);
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

  return (
    <React.Fragment>
      <FormContainer
        title="Apri Ticket"
        style={{ maxWidth: "1400px", margin: "auto" }}
      >
        <form onSubmit={handleSubmit} style={{ marginTop: 1 }}>
          <Box sx={{ p: 3 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom>
                  Informazioni Cliente
                </Typography>
                {formFields
                  .slice(0, 6)
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
                      />
                    )
                  )}
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom>
                  Dettagli Ticket
                </Typography>
                {fields.servizi.map((service, index) => (
                  <div key={index}>
                    <FormInput
                      id="servizio"
                      label="Servizio"
                      type="text"
                      value={service.servizio}
                      onChange={(e) => handleServiceChange(index, e)}
                      required
                    />
                    <FormInput
                      id="prezzo"
                      label="Prezzo"
                      type="number"
                      value={service.prezzo}
                      onChange={(e) => handleServiceChange(index, e)}
                      required
                      inputProps={{ min: 0, step: "0.01" }}
                      onKeyPress={handleKeyPress}
                    />
                  </div>
                ))}
                <Button type="button" onClick={addService}>
                  Aggiungi Servizio
                </Button>
                {formFields
                  .slice(6)
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
                      />
                    )
                  )}
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
