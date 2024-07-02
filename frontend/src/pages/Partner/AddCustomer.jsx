import React, { useState, useCallback, useMemo } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";
import { addCliente } from "../../api/apiPartner";
import CustomAlert from "../../components/Alert/CustomAlert";
import FormInput from "../../components/FormInput";
import FormActions from "../../components/FormActions";
import FormContainer from "../../components/FormContainer";
import usePageTitle from "../../CustomHooks/usePageTitle";
import useBodyBackgroundColor from "../../CustomHooks/useBodyBackgroundColor";
import { validatePhoneNumber, validateEmail, validateName } from "../../utils/validationUtils";
import { handleValidationError } from "../../utils/errorHandling";
import { formFieldsConfig } from "../../utils/formConfig";
import useFormFields from "../../CustomHooks/useFormFields";

const AddCustomer = () => {
  usePageTitle("Aggiungi Cliente");
  useBodyBackgroundColor("#007bff");

  const [fields, setField] = useFormFields({
    email: "",
    nome: "",
    cognome: "",
    telefono: ""
  });

  const [alert, setAlert] = useState({ open: false, msg: "", severity: "" });
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleAggiungiCliente = useCallback(
    async (event) => {
      event.preventDefault();
      if (!token) return;

      const { email, nome, cognome, telefono } = fields;

      if (
        handleValidationError(validatePhoneNumber, telefono, "Numero di telefono non valido", setAlert) ||
        handleValidationError(validateEmail, email, "Email non valida", setAlert) ||
        handleValidationError(validateName, nome, "Nome non valido", setAlert) ||
        handleValidationError(validateName, cognome, "Cognome non valido", setAlert)
      ) {
        return;
      }

      try {
        const newCustomer = { email, nome, cognome, telefono };
        await addCliente(token, newCustomer);
        setAlert({
          open: true,
          msg: "Cliente registrato con successo",
          severity: "success",
        });
        navigate("/clienti");
      } catch (error) {
        console.error(error);
        setAlert({
          open: true,
          msg: "Errore nella registrazione del cliente",
          severity: "error",
        });
      }
    },
    [fields, token, navigate]
  );

  const formFields = useMemo(() => formFieldsConfig(fields.email, setField("email"), fields.nome, setField("nome"), fields.cognome, setField("cognome"), fields.telefono, setField("telefono")), [fields, setField]);

  return (
    <React.Fragment>
      <FormContainer title="Aggiungi Cliente" maxWidth="sm">
        <form onSubmit={handleAggiungiCliente}>
          <Grid container spacing={2}>
            {formFields.map(({ id, label, type, value, onChange, inputProps, onKeyPress }) => (
              <Grid item xs={12} key={id}>
                <FormInput
                  id={id}
                  label={label}
                  type={type}
                  value={value}
                  onChange={onChange}
                  required
                  inputProps={inputProps}
                  onKeyPress={onKeyPress}
                />
              </Grid>
            ))}
          </Grid>
          <FormActions onSubmit={handleAggiungiCliente} />
        </form>
        {alert.open && (
          <CustomAlert msg={alert.msg} severity={alert.severity} />
        )}
      </FormContainer>
    </React.Fragment>
  );
};

export default AddCustomer;
