import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/auth/slice";
import React, { useCallback } from "react";
import {
  Container,
  Box,
  Card,
  CardContent,
  Typography,
  Button,
} from "@mui/material";
import useBodyBackgroundColor from "../../CustomHooks/useBodyBackgroundColor";
import usePageTitle from "../../CustomHooks/usePageTItle";
const Logout = () => {
  usePageTitle("Logout");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useBodyBackgroundColor("#007bff");

  const handleLogout = useCallback(() => {
    dispatch(logout());
    navigate("/login");
  }, [dispatch, navigate]);

  const handleCancel = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  return (
    <React.Fragment>
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Card sx={{ textAlign: "center", p: 5 }}>
        <CardContent>
          <Typography variant="h4" component="h2" gutterBottom>
            Sei sicuro di voler effettuare il logout?
          </Typography>
          <Typography variant="body1" component="p" gutterBottom>
            Cliccando su &apos;Logout&apos;, verrai disconnesso
            dall&apos;account.
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleCancel}
              sx={{ mr: 2 }}
            >
              Annulla
            </Button>
            <Button variant="contained" color="error" onClick={handleLogout}>
              Logout
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
    </React.Fragment>
  );
};

export default Logout;
