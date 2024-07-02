import React, { useState, useCallback, useMemo } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Grid, Box, Typography, Button } from "@mui/material";
import FormContainer from "../../components/FormContainer";
import FormInput from "../../components/FormInput";
import FormActions from "../../components/FormActions";
import CustomAlert from "../../components/Alert/CustomAlert";
import { createTicket } from "../../api/apiPartner";
import usePageTitle from "../../CustomHooks/usePageTitle";
import useBodyBackgroundColor from "../../CustomHooks/useBodyBackgroundColor";
import { validatePhoneNumber, validateIMEI, validatePrice, validateDeposit, validateName } from "../../utils/validationUtils";
import { handleValidationError } from "../../utils/errorHandling";
import useFormFields from "../../CustomHooks/useFormFields";

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

      const { nome_cliente, cognome_cliente, telefono_cliente, acconto, servizi, imei } = fields;

      const totalPrice = servizi.reduce((acc, service) => acc + parseFloat(service.prezzo || 0), 0);

      if (
        handleValidationError(validatePhoneNumber, telefono_cliente, "Numero di telefono non valido", setAlert) ||
        handleValidationError(validateName, nome_cliente, "Nome cliente non valido", setAlert) ||
        handleValidationError(validateName, cognome_cliente, "Cognome cliente non valido", setAlert) ||
        handleValidationError(validateIMEI, imei, "IMEI non valido", setAlert) ||
        handleValidationError(validatePrice, acconto, "Acconto non valido", setAlert) ||
        handleValidationError((deposit) => validateDeposit(deposit, totalPrice), acconto, "Acconto deve essere minore o uguale al totale dei servizi", setAlert)
      ) {
        return;
      }

      const filteredServices = servizi.filter(
        (service) => service.servizio && service.prezzo
      );

      try {
        await createTicket(token, { ...fields, servizi: filteredServices });
        setAlert({ open: true, msg: "Ticket creato con successo", severity: "success" });
        setTimeout(() => navigate("/partner-dashboard"), 2000);
      } catch (err) {
        setAlert({ open: true, msg: "Errore nella creazione del ticket", severity: "error" });
      }
    },
    [fields, token, navigate]
  );

  const formFields = useMemo(() => [
    {
      id: "telefono_cliente",
      label: "Telefono Cliente",
      type: "text",
      value: fields.telefono_cliente,
      onChange: (e) => setField("telefono_cliente")(e.target.value),
      required: true,
      inputProps: { pattern: "^\\+?[0-9]{10,13}$" },
      onKeyPress: handleTelefonoKeyPress,
    },
    {
      id: "nome_cliente",
      label: "Nome Cliente",
      type: "text",
      value: fields.nome_cliente,
      onChange: (e) => setField("nome_cliente")(e.target.value),
      required: true,
    },
    {
      id: "cognome_cliente",
      label: "Cognome Cliente",
      type: "text",
      value: fields.cognome_cliente,
      onChange: (e) => setField("cognome_cliente")(e.target.value),
      required: true,
    },
    {
      id: "descrizione_problema",
      label: "Descrizione Problema",
      type: "text",
      value: fields.descrizione_problema,
      onChange: (e) => setField("descrizione_problema")(e.target.value),
      required: true,
    },
    {
      id: "marca",
      label: "Marca",
      type: "text",
      value: fields.marca,
      onChange: (e) => setField("marca")(e.target.value),
      required: true,
    },
    {
      id: "modello",
      label: "Modello",
      type: "text",
      value: fields.modello,
      onChange: (e) => setField("modello")(e.target.value),
      required: true,
    },
    {
      id: "acconto",
      label: "Acconto",
      type: "number",
      value: fields.acconto,
      onChange: (e) => setField("acconto")(e.target.value),
      required: true,
      inputProps: { min: 0, step: "0.01" },
      onKeyPress: handleKeyPress,
    },
    {
      id: "imei",
      label: "IMEI",
      type: "text",
      value: fields.imei,
      onChange: (e) => setField("imei")(e.target.value),
      required: true,
    },
    {
      id: "pin",
      label: "PIN",
      type: "text",
      value: fields.pin,
      onChange: (e) => setField("pin")(e.target.value),
      required: true,
    },
    {
      id: "seriale",
      label: "Seriale",
      type: "text",
      value: fields.seriale,
      onChange: (e) => setField("seriale")(e.target.value),
      required: true,
    },
  ], [fields, setField]);

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
                {formFields.map(({ id, label, type, value, onChange, required, inputProps, onKeyPress }) => (
                  <FormInput
                    key={id}
                    id={id}
                    label={label}
                    type={type}
                    value={value}
                    onChange={onChange}
                    required={required}
                    inputProps={inputProps}
                    onKeyPress={onKeyPress}
                  />
                ))}
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
