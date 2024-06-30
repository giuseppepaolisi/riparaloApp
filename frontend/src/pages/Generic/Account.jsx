import React, { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { fetchUserData, updateUserData } from "../../api/apiUser";
import { useNavigate } from "react-router-dom";
import { Grid, Box, Typography } from "@mui/material";
import Loading from "../../components/Loading";
import CustomAlert from "../../components/Alert/CustomAlert";
import FormInput from "../../components/FormInput";
import FormActions from "../../components/FormActions";
import FormContainer from "../../components/FormContainer";
import useBodyBackgroundColor from "../../CustomHooks/useBodyBackgroundColor";
import usePageTitle from "../../CustomHooks/usePageTitle";

const Account = () => {
  usePageTitle("Account");
  useBodyBackgroundColor("#007bff");

  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState({ open: false, msg: "", severity: "" });
  const { token, user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token || !user) return;

    const loadUserData = async () => {
      try {
        const data = await fetchUserData(token, user._id);
        setUserData(data);
      } catch (error) {
        console.error(error);
        setAlert({
          open: true,
          msg: "Errore nel caricamento dei dati",
          severity: "error",
        });
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, [token, user]);

  const handleChange = useCallback((e) => {
    const { id, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [id]: value }));
  }, []);

  const handleSave = async (event) => {
    event.preventDefault();
    const { newPassword, oldPassword, ...dataToSave } = userData;
    if (Object.values(dataToSave).some((field) => field === "")) {
      setAlert({
        open: true,
        msg: "Tutti i campi devono essere riempiti",
        severity: "error",
      });
      return;
    }
    try {
      const payload = {
        ...dataToSave,
        ...(newPassword && { newPassword }),
        ...(oldPassword && { oldPassword }),
      };
      await updateUserData(token, user._id, payload);
      setAlert({
        open: true,
        msg: "Dati aggiornati con successo",
        severity: "success",
      });
      setTimeout(() => {
        navigate("/"); // Reindirizza dopo aver mostrato l'alert
      }, 1000); // Imposta un ritardo di 1 secondo prima del reindirizzamento
    } catch (error) {
      console.error(error);
      setAlert({
        open: true,
        msg: error.message || "Errore nell'aggiornamento dei dati",
        severity: "error",
      });
    }
  };

  const handleCancel = () => {
    navigate(-1); // Torna indietro alla pagina precedente
  };

  if (loading) {
    return <Loading open={loading} />;
  }

  return (
    <React.Fragment>
      <FormContainer
        title="Account"
        style={{ maxWidth: "1400px", margin: "auto" }}
      >
        {alert.open && (
          <CustomAlert
            msg={alert.msg}
            severity={alert.severity}
            onClose={() => setAlert({ open: false, msg: "", severity: "" })}
          />
        )}
        <form onSubmit={handleSave} style={{ marginTop: 1 }}>
          <Box sx={{ p: 3 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  Informazioni Personali
                </Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <FormInput
                  label="Nome"
                  id="nome"
                  value={userData.nome || ""}
                  onChange={handleChange}
                  type="text"
                  required
                />
                <FormInput
                  label="Cognome"
                  id="cognome"
                  value={userData.cognome || ""}
                  onChange={handleChange}
                  type="text"
                  required
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <FormInput
                  label="Email"
                  id="email"
                  value={userData.email || ""}
                  onChange={handleChange}
                  type="email"
                  required
                />
                {user.role !== "tecnico" && (
                  <FormInput
                    label="Telefono"
                    id="telefono"
                    value={userData.telefono || ""}
                    onChange={handleChange}
                    type="tel"
                    required
                  />
                )}
              </Grid>
              <Grid item xs={12} md={4}>
                <FormInput
                  label="Vecchia Password"
                  id="oldPassword"
                  value={userData.oldPassword || ""}
                  onChange={handleChange}
                  type="password"
                />
                <FormInput
                  label="Nuova Password"
                  id="newPassword"
                  value={userData.newPassword || ""}
                  onChange={handleChange}
                  type="password"
                />
              </Grid>
              {user.role === "partner" && (
                <>
                  <Grid item xs={12}>
                    <Typography variant="h6" gutterBottom>
                      Dati Aziendali
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormInput
                      label="Ragione Sociale"
                      id="ragioneSociale"
                      value={userData.ragioneSociale || ""}
                      onChange={handleChange}
                      type="text"
                      required
                    />
                    <FormInput
                      label="Partita IVA"
                      id="partitaIVA"
                      value={userData.partitaIVA || ""}
                      onChange={handleChange}
                      type="text"
                      required
                    />
                    <FormInput
                      label="Codice Univoco"
                      id="codiceUnivoco"
                      value={userData.codiceUnivoco || ""}
                      onChange={handleChange}
                      type="text"
                      required
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormInput
                      label="PEC"
                      id="pec"
                      value={userData.pec || ""}
                      onChange={handleChange}
                      type="email"
                      required
                    />
                    <FormInput
                      label="CAP"
                      id="cap"
                      value={userData.cap || ""}
                      onChange={handleChange}
                      type="text"
                      required
                    />
                    <FormInput
                      label="Via"
                      id="via"
                      value={userData.via || ""}
                      onChange={handleChange}
                      type="text"
                      required
                    />
                    <FormInput
                      label="Provincia"
                      id="provincia"
                      value={userData.provincia || ""}
                      onChange={handleChange}
                      type="text"
                      required
                    />
                  </Grid>
                </>
              )}
            </Grid>
          </Box>
          <FormActions onSubmit={handleSave} onCancel={handleCancel} />
        </form>
      </FormContainer>
    </React.Fragment>
  );
};

export default Account;
