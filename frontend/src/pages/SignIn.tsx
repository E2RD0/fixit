import React, { useEffect, useState } from "react";
import { Box, Button, Container, TextField, Typography, FormControlLabel, Checkbox, Alert } from "@mui/material";
import axios, { AxiosError } from "axios";
import { useNavigate, Link } from "react-router-dom";
import constants from "../utils/constants";
import { isAuthenticated } from "../utils/auth";


const SignIn: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [rememberMe, setRememberMe] = useState<boolean>(false);

  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated()) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Clear previous errors

    try {
      const response = await axios.post(`${constants.SERVICE_URL}/user/login`, {
        email,
        password,
      });

      const { token } = response.data;

      if (rememberMe) {
        localStorage.setItem("token", token); // Persistent storage
      } else {
        sessionStorage.setItem("token", token); // Temporary session
      }
      navigate("/dashboard");
    } catch (err) {
      console.error("Login Error:", err);
      let errorMessage = "Error al iniciar sesión. Por favor, inténtalo de nuevo.";
      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          errorMessage = "Credenciales inválidas. Por favor, inténtalo de nuevo.";
        } else if (err.response?.data?.message) {
          errorMessage = err.response.data.message;
        }
      }
      setError(errorMessage);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8, boxShadow: 3, borderRadius: 2, p: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Iniciar Sesión
      </Typography>
      <Typography variant="body1" align="center" color="textSecondary" paragraph>
        Ingresa tu correo electrónico y contraseña para acceder.
      </Typography>

      {/* Error Message */}
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {/* Login Form */}
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          margin="normal"
          required
          fullWidth
          label="Correo electrónico"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          variant="outlined"
        />
        <TextField
          margin="normal"
          required
          fullWidth
          label="Contraseña"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          variant="outlined"
        />
        <FormControlLabel
          control={<Checkbox checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />}
          label="Mantener sesión"
        />
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
          Acceder
        </Button>
      </Box>

      <Typography variant="body2" align="center" sx={{ mt: 2 }}>
        ¿No tienes una cuenta?{" "}
        <Link to="/signup" style={{ color: "#1976d2", textDecoration: "none" }}>
          Regístrate
        </Link>
      </Typography>
    </Container>
  );
};

export default SignIn;
