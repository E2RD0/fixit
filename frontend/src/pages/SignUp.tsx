import React from "react";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const SignUp: React.FC = () => {
  return (
    <Container maxWidth="sm" sx={{ mt: 8, boxShadow: 3, borderRadius: 2, p: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Regístrate
      </Typography>
      <Typography variant="body1" align="center" color="textSecondary" paragraph>
        Crea tu cuenta para acceder a Fixit.
      </Typography>
      <Box component="form">
        <TextField
          margin="normal"
          required
          fullWidth
          label="Nombre de usuario"
          type="text"
          variant="outlined"
        />
        <TextField
          margin="normal"
          required
          fullWidth
          label="Email"
          type="email"
          variant="outlined"
        />
        <TextField
          margin="normal"
          required
          fullWidth
          label="Contraseña"
          type="password"
          variant="outlined"
        />
        <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
          Registrarse
        </Button>
      </Box>
      <Typography variant="body2" align="center" sx={{ mt: 2 }}>
        ¿Ya tienes una cuenta?{" "}
        <Link to="/signin" style={{ color: "#1976d2", textDecoration: "none" }}>
          Iniciar sesión
        </Link>
      </Typography>
    </Container>
  );
};

export default SignUp;
