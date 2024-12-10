import React, { useEffect, useState } from "react";
import { Box, Button, Container, TextField, Typography, Alert } from "@mui/material";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import constants from "../utils/constants";
import { isAuthenticated } from "../utils/auth";

const SignUp: React.FC = () => {
  // State for form inputs
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  // State for success/error messages
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // React Router navigation
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated()) {
      navigate("/dashboard");
    }
  }, [navigate]);

  // Form submission handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent page reload
    setError(null);
    setSuccess(null);

    try {
      // POST request to backend
      const response = await axios.post(`${constants.SERVICE_URL}/user`, {
        name,
        email,
        password,
      });

      // Handle success response
      if (response.status === 201 || response.status === 200) {
        setSuccess("¡Cuenta creada con éxito! Redirigiendo a Iniciar Sesión...");
        setTimeout(() => {
          navigate("/signin"); // Redirect to Sign In page
        }, 2000);
      }
    } catch (err) {
      // Handle error response
      console.error("Error de registro:", err);
      let errorMessage = "Algo salió mal. Por favor, inténtalo de nuevo.";
      if (err instanceof AxiosError && err.response?.data?.message) {
        errorMessage = err.response.data.message;
      }
      setError(errorMessage);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8, boxShadow: 3, borderRadius: 2, p: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Regístrate
      </Typography>
      <Typography variant="body1" align="center" color="textSecondary" paragraph>
        Crea tu cuenta para acceder a Fixit.
      </Typography>

      {/* Display Success or Error Message */}
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {success}
        </Alert>
      )}

      {/* Form */}
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          margin="normal"
          required
          fullWidth
          label="Nombre completo"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          label="Correo electrónico"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          label="Contraseña"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
          Registrarse
        </Button>
      </Box>

      <Typography variant="body2" align="center" sx={{ mt: 2 }}>
        ¿Ya tienes una cuenta?{" "}
        <Button href="/signin" variant="text">
          Iniciar sesión
        </Button>
      </Typography>
    </Container>
  );
};

export default SignUp;
