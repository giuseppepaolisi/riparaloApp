import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { fetchClienteById, updateCliente } from "../../api/apiPartner";
import { Grid, Box } from "@mui/material";
import Loading from "../../components/Loading";
import CustomAlert from "../../components/Alert/CustomAlert";
import FormInput from "../../components/FormInput";
import FormActions from "../../components/FormActions";
import FormContainer from "../../components/FormContainer";
import usePageTitle from "../../CustomHooks/usePageTitle";
import { validatePhoneNumber } from "../../utils/validationUtils";
import useFormFields from "../../CustomHooks/useFormFields";
import { formFieldsConfig } from "../../utils/formConfig";

const EditCustomer = () => {
  usePageTitle("Modifica Cliente");

  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);

  const [fields, setField] = useFormFields({
    nome: "",
    cognome: "",
    email: "",
    telefono: "",
  });

  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState({ open: false, msg: "", severity: "" });

  useEffect(() => {
    const loadCliente = async () => {
      try {
        const clienteData = await fetchClienteById(token, id);
        Object.keys(clienteData).forEach(key => {
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

  const handleKeyPress = (e) => {
    if (!/[0-9+]/.test(e.key)) {
      e.preventDefault();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const telefonoError = validatePhoneNumber(fields.telefono);
    if (telefonoError) {
      setAlert({
        open: true,
        msg: telefonoError,
        severity: "error",
      });
      return;
    }

    try {
      await updateCliente(token, id, fields);
      setAlert({
        open: true,
        msg: "Cliente aggiornato con successo",
        severity: "success",
      });
      setTimeout(() => {
        navigate("/clienti");
      }, 1000);
    } catch (error) {
      console.error(error);
      setAlert({
        open: true,
        msg: "Errore nell'aggiornamento del cliente",
        severity: "error",
      });
    }
  };

  const handleCancel = () => {
    navigate("/clienti");
  };

  if (loading) return <Loading open={loading} />;

  const formFields = formFieldsConfig(fields, setField);

  return (
    <React.Fragment>
      <FormContainer
        title="Modifica Cliente"
        style={{ maxWidth: "600px", margin: "auto" }}
      >
        <form onSubmit={handleSubmit} style={{ marginTop: 1 }}>
          <Box sx={{ p: 3 }}>
            <Grid container spacing={3}>
              {formFields.slice(0, 4).map(({ id, label, type, value, onChange, required, inputProps }) => (
                <Grid item xs={12} key={id}>
                  <FormInput
                    label={label}
                    id={id}
                    value={value}
                    onChange={onChange}
                    type={type}
                    required={required}
                    inputProps={inputProps}
                    onKeyPress={id === "telefono" ? handleKeyPress : null}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
          <FormActions onSubmit={handleSubmit} onCancel={handleCancel} />
        </form>
        {alert.open && (
          <CustomAlert
            msg={alert.msg}
            severity={alert.severity}
            onClose={() => setAlert({ open: false, msg: "", severity: "" })}
          />
        )}
      </FormContainer>
    </React.Fragment>
  );
};

export default EditCustomer;
