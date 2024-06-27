import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { fetchTicketById } from "../../api/apiPartner";
import { Typography, Box, Paper } from "@mui/material";

const DetailsTicket = () => {
  const { id } = useParams();
  const { token } = useSelector((state) => state.auth);
  const [ticket, setTicket] = useState(null);

  useEffect(() => {
    const fetchTicketData = async () => {
      try {
        const data = await fetchTicketById(token, id);
        setTicket(data);
      } catch (error) {
        console.error("Error fetching ticket:", error);
      }
    };

    if (token && id) {
      fetchTicketData();
    }
  }, [token, id]);

  if (!ticket) {
    return <div>Loading...</div>;
  }

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Dettagli del Ticket
      </Typography>
      <Paper elevation={3} style={{ padding: "16px" }}>
        <Typography variant="h6">ID: {ticket._id}</Typography>
        <Typography variant="body1">ID Partner: {ticket.id_partner}</Typography>
        <Typography variant="body1">
          Nome Cliente: {ticket.nome_cliente}
        </Typography>
        <Typography variant="body1">
          Cognome Cliente: {ticket.cognome_cliente}
        </Typography>
        <Typography variant="body1">Marca: {ticket.marca}</Typography>
        <Typography variant="body1">Modello: {ticket.modello}</Typography>
        <Typography variant="body1">Stato: {ticket.stato}</Typography>
        <Typography variant="body1">
          Descrizione Problema: {ticket.descrizione_problema}
        </Typography>
      </Paper>
    </Box>
  );
};

export default DetailsTicket;
