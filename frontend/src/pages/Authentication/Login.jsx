import { login } from "../../redux/auth/slice";
import { useDispatch } from "react-redux";
import React, { useState } from "react";
import {
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Container,
  Box,
  Typography,
  Card,
  CardContent,
  Alert,
} from "@mui/material";
import usePageTitle from "../../CustomHooks/usePageTitle";
import useBodyBackgroundColor from "../../CustomHooks/useBodyBackgroundColor";

const Login = () => {
  usePageTitle("Login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();

  useBodyBackgroundColor("#007bff");

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        dispatch(login({ token: data.token, user: data.user }));

        if (rememberMe) {
          localStorage.setItem("rememberMe", true);
        } else {
          localStorage.removeItem("rememberMe");
        }
      } else {
        setError(data.error);
        throw new Error(
          data.error || "Non è stato possibile effettuare il login"
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <React.Fragment>
      <Container maxWidth="sm">
        <Box mt={5}>
          <Card>
            <CardContent>
              <Typography variant="h4" align="center" gutterBottom>
                Login
              </Typography>
              <form onSubmit={handleLogin}>
                <TextField
                  fullWidth
                  label="E-mail"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  margin="normal"
                  required
                />
                <TextField
                  fullWidth
                  label="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  margin="normal"
                  required
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      color="primary"
                    />
                  }
                  label="Rimani connesso"
                />
                <Box mt={2} mb={2}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                  >
                    Accedi
                  </Button>
                </Box>
              </form>
              {error && (
                <Alert severity="error" sx={{ mt: 2 }}>
                  {error}
                </Alert>
              )}
            </CardContent>
          </Card>
        </Box>
      </Container>
    </React.Fragment>
  );
};

export default Login;
