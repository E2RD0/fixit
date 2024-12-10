import React from "react";
import { AppBar, Toolbar, Typography, Box, IconButton, Avatar } from "@mui/material";
import { Logout as LogoutIcon, Person as PersonIcon } from "@mui/icons-material";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { logout } from "../utils/auth";

interface TokenPayload {
  user: {
    name: string;
  };
}

const Navmenu: React.FC = () => {
  const navigate = useNavigate();

  // Get and decode the JWT token
  const token = localStorage.getItem("token") || sessionStorage.getItem("token");
  const userName = token ? jwtDecode<TokenPayload>(token).user.name : "Usuario";

  // Handle logout
  const handleLogout = () => {
    logout(); // Clear token from storage
    navigate("/"); // Navigate to home page
  };

  return (
    <AppBar position="static" color="primary">
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* Left Section: App Name */}
        <Box display="flex" alignItems="center">
          <Avatar alt="App Logo" src="/favicon.png" sx={{ mr: 1 }} />
          <Typography variant="h6" component="div" color="inherit">
            Fixit App
          </Typography>
        </Box>

        {/* Right Section: User Info and Logout */}
        <Box display="flex" alignItems="center" gap={2}>
          <Box display="flex" alignItems="center" gap={1}>
            <PersonIcon />
            <Typography variant="body1" color="inherit">
              {userName}
            </Typography>
          </Box>

          <IconButton color="inherit" onClick={handleLogout}>
            <LogoutIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navmenu;
