import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { fetchPartnerById } from "../../api/apiAdmin";
import { updatePartner } from "../../api/apiAdmin";
import {
  TextField,
  Button,
  Container,
  Box,
  Grid,
} from "@mui/material";
import Loading from "../../components/Loading";
import CustomAlert from "../../components/Alert/CustomAlert";
import usePageTitle from "../../CustomHooks/usePageTitle";
import useBodyBackgroundColor from "../../CustomHooks/useBodyBackgroundColor";

const EditPartner = () => {
  usePageTitle("Modifica Partner");
  useBodyBackgroundColor("#007bff");
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);

  const [partner, setPartner] = useState(null);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState({ open: false, msg: "", severity: "" });

  useEffect(() => {
    const loadPartner = async () => {
      try {
        const partnerData = await fetchPartnerById(token, id);
        setPartner(partnerData);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setAlert({
          open: true,
          msg: "Errore nel caricamento del partner",
          severity: "error",
        });
        setLoading(false);
      }
    };

    if (token) {
      loadPartner();
    }
  }, [token, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPartner((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updatePartner(token, id, partner);
      setAlert({
        open: true,
        msg: "Partner aggiornato con successo",
        severity: "success",
      });
      navigate("/partner");
    } catch (error) {
      console.error(error);
      setAlert({
        open: true,
        msg: "Errore nell'aggiornamento del partner",
        severity: "error",
      });
    }
  };

  const handleCancel = () => {
    navigate("/partner");
  };

  if (loading) return <Loading open={loading} />;

  return (
    <React.Fragment>
      <Container component="main" maxWidth="xs">
        <Box mt={8} display="flex" flexDirection="column" alignItems="center">
          <form onSubmit={handleSubmit} style={{ marginTop: 1 }}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="nome"
              label="Nome"
              name="nome"
              autoComplete="nome"
              autoFocus
              value={partner?.nome || ""}
              onChange={handleChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="ragioneSociale"
              label="Ragione Sociale"
              name="ragioneSociale"
              autoComplete="ragioneSociale"
              value={partner?.ragioneSociale || ""}
              onChange={handleChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              value={partner?.email || ""}
              onChange={handleChange}
            />
            <Grid container spacing={2} sx={{ mt: 3 }}>
              <Grid item xs={6}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                >
                  Salva
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  fullWidth
                  variant="outlined"
                  color="secondary"
                  onClick={handleCancel}
                >
                  Annulla
                </Button>
              </Grid>
            </Grid>
          </form>
          {alert.open && (
            <CustomAlert msg={alert.msg} severity={alert.severity} />
          )}
        </Box>
      </Container>
    </React.Fragment>
  );
};

export default EditPartner;
