// frontend/src/pages/Partner/ClienteDetails.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { fetchClienteById } from "../../api/apiPartner";
import Loading from "../../components/Loading";
import { Typography, Box } from "@mui/material";

const ClienteDetails = () => {
  const { id } = useParams();
  const { token } = useSelector((state) => state.auth);
  const [cliente, setCliente] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCliente = async () => {
      if (!token) return;
      try {
        const data = await fetchClienteById(token, id);
        setCliente(data);
        setLoading(false);
      } catch (error) {
        console.error("Errore nel recupero del cliente", error);
        setLoading(false);
      }
    };

    getCliente();
  }, [token, id]);

  if (loading) {
    return <Loading open={loading} />;
  }

  if (!cliente) {
    return <Typography variant="h6">Cliente non trovato</Typography>;
  }

  return (
    <Box>
      <Typography variant="h4">Dettagli del Cliente</Typography>
      <Typography variant="body1">
        <strong>Nome:</strong> {cliente.nome}
      </Typography>
      <Typography variant="body1">
        <strong>Cognome:</strong> {cliente.cognome}
      </Typography>
      <Typography variant="body1">
        <strong>Email:</strong> {cliente.email}
      </Typography>
      <Typography variant="body1">
        <strong>Telefono:</strong> {cliente.telefono}
      </Typography>
      <Typography variant="body1">
        <strong>Ragione Sociale:</strong> {cliente.ragioneSociale}
      </Typography>
      <Typography variant="body1">
        <strong>Partita IVA:</strong> {cliente.partitaIVA}
      </Typography>
      <Typography variant="body1">
        <strong>Codice Univoco:</strong> {cliente.codiceUnivoco}
      </Typography>
      <Typography variant="body1">
        <strong>PEC:</strong> {cliente.pec}
      </Typography>
      <Typography variant="body1">
        <strong>CAP:</strong> {cliente.cap}
      </Typography>
      <Typography variant="body1">
        <strong>Via:</strong> {cliente.via}
      </Typography>
      <Typography variant="body1">
        <strong>Provincia:</strong> {cliente.provincia}
      </Typography>
      {/* Aggiungi altri campi come necessario */}
    </Box>
  );
};

export default ClienteDetails;
