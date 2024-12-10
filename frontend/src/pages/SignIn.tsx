import React from "react";
import { Box, Button, Container, TextField, Typography, FormControlLabel, Checkbox } from "@mui/material";
import { Link } from "react-router-dom";

const SignIn: React.FC = () => {
  return (
    <Container maxWidth="sm" sx={{ mt: 8, boxShadow: 3, borderRadius: 2, p: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Iniciar Sesión
      </Typography>
      <Typography variant="body1" align="center" color="textSecondary" paragraph>
        Ingresa tu correo electrónico y contraseña para acceder.
      </Typography>
      <Box component="form">
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
        <FormControlLabel control={<Checkbox />} label="Mantener sesión" />
        <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
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
