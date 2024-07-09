import { Box, Grid, Typography, Link, IconButton, Paper, Chip, Button } from "@mui/material";
import PrintIcon from "@mui/icons-material/Print";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import usePageTitle from "../../CustomHooks/usePageTitle";
import useBodyBackgroundColor from "../../CustomHooks/useBodyBackgroundColor";
import stateColors from "../../assets/json/state.json"; // Assicurati che il percorso sia corretto

const TicketDetails = () => {
  usePageTitle("Dettagli Ticket");
  useBodyBackgroundColor("#fff");

  const ticketStatus = "Aperto"; // Questo dovrebbe essere dinamico, impostato in base ai dati del ticket
  const statusColor = stateColors[ticketStatus] || "#FFFFFF";

  const handleDelete = () => {
    // Aggiungi la logica di eliminazione qui
    console.log("Ticket eliminato");
  };

  return (
    <Box sx={{ padding: 3, display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Box>
        <Typography variant="h6" gutterBottom>
          TICKET ID: 662a6d00eedee8b18bb75f53
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="h6" sx={{ mr: 1 }}>STATO TICKET</Typography>
            <Chip
              label={ticketStatus}
              sx={{
                backgroundColor: statusColor,
                color: "#000",
                border: "1px solid #000"
              }}
            />
          </Box>
          <Box>
            <Typography variant="h6" component="span">STAMPA TICKET</Typography>
            <IconButton color="primary">
              <PictureAsPdfIcon />
            </IconButton>
            <IconButton color="primary">
              <PrintIcon />
            </IconButton>
          </Box>
        </Box>

        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ padding: 2, height: '100%' }}>
              <Typography variant="h6" gutterBottom>DATI GENERALI</Typography>
              <Typography variant="body1" gutterBottom>
                INFORMAZIONI DISPOSITIVO <Link href="#">Clicca qui</Link>
              </Typography>
              <Typography variant="body1" gutterBottom>
                INFORMAZIONI CLIENTE <Link href="#">Clicca qui</Link>
              </Typography>
              <Typography variant="body1">
                STORICO TICKET <Link href="#">Clicca qui</Link>
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper sx={{ padding: 2, height: '100%' }}>
              <Typography variant="h6">DETTAGLI PREVENTIVO</Typography>
              <Box sx={{ mt: 1, mb: 1, border: '1px solid', padding: 1 }}>
                <Typography variant="body2">Riparazione schermo 40 €</Typography>
                <Typography variant="body2">Connettore batteria 50 €</Typography>
                <Typography variant="body2">Connettore audio 30 €</Typography>
                <Typography variant="h6">Prezzo stimato 110 €</Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center", mt: 'auto', mb: 3 }}>
        <Button variant="contained" color="error" onClick={handleDelete} sx={{ marginRight: 2 }}>
          ELIMINA TICKET
        </Button>
        <Button variant="outlined" sx={{ color: '#1976d2', borderColor: '#1976d2' }}>
          INDIETRO
        </Button>
      </Box>
    </Box>
  );
};

export default TicketDetails;
