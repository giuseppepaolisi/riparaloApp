import { Dialog, DialogTitle, DialogContent, Typography, Paper, Box } from "@mui/material";
import PropTypes from "prop-types";

const TicketDetailModal = ({ open, onClose, ticket }) => {
  if (!ticket) {
    return null;
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Dettagli del Ticket</DialogTitle>
      <DialogContent>
        <Box p={3}>
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
      </DialogContent>
    </Dialog>
  );
};

TicketDetailModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  ticket: PropTypes.object,
};

export default TicketDetailModal;
