import { useState, useEffect, useMemo, useCallback } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";
import { addCliente } from "../../api/apiPartner";
import CustomAlert from "../../components/Alert/CustomAlert";
import FormInput from "../../components/FormInput";
import FormActions from "../../components/FormActions";
import FormContainer from "../../components/FormContainer";
import Title from "../../components/Title";

const AddCustomer = () => {
  const [email, setEmail] = useState("");
  const [nome, setNome] = useState("");
  const [cognome, setCognome] = useState("");
  const [telefono, setTelefono] = useState("");
  const [alert, setAlert] = useState({ open: false, msg: "", severity: "" });

  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleAggiungiCliente = useCallback(
    async (event) => {
      event.preventDefault();
      if (!token) return;

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
    [email, nome, cognome, telefono, token, navigate]
  );

  useEffect(() => {
    document.body.style.backgroundColor = "#007bff";
    return () => {
      document.body.style.backgroundColor = null;
    };
  }, []);

  const formFields = useMemo(
    () => [
      {
        id: "email",
        label: "Email",
        type: "email",
        value: email,
        onChange: (e) => setEmail(e.target.value),
      },
      {
        id: "nome",
        label: "Nome",
        type: "text",
        value: nome,
        onChange: (e) => setNome(e.target.value),
      },
      {
        id: "cognome",
        label: "Cognome",
        type: "text",
        value: cognome,
        onChange: (e) => setCognome(e.target.value),
      },
      {
        id: "telefono",
        label: "Telefono",
        type: "tel",
        value: telefono,
        onChange: (e) => setTelefono(e.target.value),
      },
    ],
    [email, nome, cognome, telefono]
  );

  return (
    <FormContainer title="Aggiungi Cliente" maxWidth="sm">
      <Title title="Aggiungi Cliente" />
      <form onSubmit={handleAggiungiCliente}>
        <Grid container spacing={2}>
          {formFields.map(({ id, label, type, value, onChange }) => (
            <Grid item xs={12} key={id}>
              <FormInput
                id={id}
                label={label}
                type={type}
                value={value}
                onChange={onChange}
                required
              />
            </Grid>
          ))}
        </Grid>
        <FormActions onSubmit={handleAggiungiCliente} />
      </form>
      {alert.open && <CustomAlert msg={alert.msg} severity={alert.severity} />}
    </FormContainer>
  );
};

export default AddCustomer;
