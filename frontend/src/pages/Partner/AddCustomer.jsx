import React, { useState, useCallback, useMemo } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";
import CustomAlert from "../../components/Alert/CustomAlert";
import FormInput from "../../components/Form/FormInput";
import FormActions from "../../components/Form/FormActions";
import FormContainer from "../../components/Form/FormContainer";
import usePageTitle from "../../CustomHooks/usePageTitle";
import useBodyBackgroundColor from "../../CustomHooks/useBodyBackgroundColor";
import {
  validatePhoneNumber,
  validateEmail,
  validateName,
} from "../../utils/validationUtils";
import { handleValidationError } from "../../utils/errorHandling";
import { formFieldsConfig } from "../../utils/formConfig";
import useFormFields from "../../CustomHooks/useFormFields";
import { handleCustomerAdd } from "../../utils/customerUtils";

const AddCustomer = () => {
  usePageTitle("Aggiungi Cliente");
  useBodyBackgroundColor("#007bff");

  const [fields, setField] = useFormFields({
    email_cliente: "",
    nome_cliente: "",
    cognome_cliente: "",
    telefono_cliente: "",
  });

  const [alert, setAlert] = useState({ open: false, msg: "", severity: "" });
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleAggiungiCliente = useCallback(
    async (event) => {
      event.preventDefault();
      if (!token) return;

      if (
        handleValidationError(
          validatePhoneNumber,
          fields.telefono_cliente,
          "Numero di telefono non valido",
          setAlert
        ) ||
        (fields.email_cliente &&
          handleValidationError(
            validateEmail,
            fields.email_cliente,
            "Email non valida",
            setAlert
          )) ||
        handleValidationError(
          validateName,
          fields.nome_cliente,
          "Nome non valido",
          setAlert
        ) ||
        handleValidationError(
          validateName,
          fields.cognome_cliente,
          "Cognome non valido",
          setAlert
        )
      ) {
        return;
      }

      await handleCustomerAdd(fields, token, setAlert, () => {
        setTimeout(() => {
          navigate("/clienti");
        }, 1000);
      });
    },
    [fields, token, navigate]
  );

  const formFields = useMemo(
    () =>
      formFieldsConfig(fields, setField, [
        { id: "nome_cliente" },
        { id: "cognome_cliente" },
        { id: "telefono_cliente" },
        {
          id: "email_cliente",
          label: "Email Cliente",
          type: "email",
          required: false,
        },
      ]),
    [fields, setField]
  );

  return (
    <React.Fragment>
      <FormContainer title="Aggiungi Cliente" maxWidth="sm">
        <form onSubmit={handleAggiungiCliente}>
          <Grid container spacing={2}>
            {formFields.map(
              ({
                id,
                label,
                type,
                value,
                onChange,
                inputProps,
                onKeyPress,
              }) => (
                <Grid item xs={12} key={id}>
                  <FormInput
                    id={id}
                    label={label}
                    type={type}
                    value={value}
                    onChange={onChange}
                    required={id !== "email_cliente"}
                    inputProps={inputProps}
                    onKeyPress={onKeyPress}
                  />
                </Grid>
              )
            )}
          </Grid>
          <FormActions onSubmit={handleAggiungiCliente} />
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

export default AddCustomer;
