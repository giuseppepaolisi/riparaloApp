import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { fetchClienteById } from "../../api/apiPartner";
import { Grid } from "@mui/material";
import Loading from "../../components/Loading";
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
import { handleCustomerUpdate } from "../../utils/customerUtils";

const EditCustomer = () => {
  usePageTitle("Modifica Cliente");
  useBodyBackgroundColor("#007bff");

  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);

  const [fields, setField] = useFormFields({
    email_cliente: "",
    nome_cliente: "",
    cognome_cliente: "",
    telefono_cliente: ""
  });

  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState({ open: false, msg: "", severity: "" });

  useEffect(() => {
    const loadCliente = async () => {
      try {
        const clienteData = await fetchClienteById(token, id);
        Object.keys(clienteData).forEach((key) => {
          if (key in fields) {
            setField(key)(clienteData[key]);
          }
        });
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
  }, [token, id, setField, fields]);

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();

      if (
        handleValidationError(validatePhoneNumber, fields.telefono_cliente, "Numero di telefono non valido", setAlert) ||
        handleValidationError(validateEmail, fields.email_cliente, "Email non valida", setAlert) ||
        handleValidationError(validateName, fields.nome_cliente, "Nome non valido", setAlert) ||
        handleValidationError(validateName, fields.cognome_cliente, "Cognome non valido", setAlert)
      ) {
        return;
      }

      handleCustomerUpdate(token, id, fields, setAlert, navigate);
    },
    [fields, token, id, navigate, setAlert]
  );

  const handleCancel = () => {
    navigate("/clienti");
  };

  const formFields = useMemo(() => formFieldsConfig(fields, setField, [
    { id: "nome_cliente" },
    { id: "cognome_cliente" },
    { id: "telefono_cliente" },
    { id: "email_cliente", label: "Email Cliente", type: "email" }
  ]), [fields, setField]);

  if (loading) return <Loading open={loading} />;

  return (
    <React.Fragment>
      <FormContainer title="Modifica Cliente" maxWidth="sm">
        <form onSubmit={handleSubmit}>
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
          <FormActions onSubmit={handleSubmit} onCancel={handleCancel} />
        </form>
        {alert.open && (
          <CustomAlert msg={alert.msg} severity={alert.severity} />
        )}
      </FormContainer>
    </React.Fragment>
  );
};

export default EditCustomer;
