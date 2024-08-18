import { updateCliente, addCliente } from "../api/apiPartner";

export async function handleCustomerUpdate(
  token,
  id,
  fields,
  setAlert,
  navigate
) {
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
}

export async function handleCustomerAdd(fields, token, setAlert, onSuccess) {
  const {
    email_cliente,
    nome_cliente,
    cognome_cliente,
    telefono_cliente,
  } = fields;

  try {
    const newCustomer = {
      email: email_cliente,
      nome: nome_cliente,
      cognome: cognome_cliente,
      telefono: telefono_cliente,
    };
    await addCliente(token, newCustomer);
    setAlert({
      open: true,
      msg: "Cliente registrato con successo",
      severity: "success",
    });
    onSuccess();
  } catch (error) {
    console.error(error);
    setAlert({
      open: true,
      msg: "Errore nella registrazione del cliente",
      severity: "error",
    });
  }
}
