
import React from "react";
import { Typography, Avatar, Button, Paper } from "@mui/material";

const Header = ({ user, logout }) => {
  return (
    <Paper
      style={{
        position: "fixed",
        border:"none",
        top: 0,
        left: 0,
        right: 0,
        height: "70px", // Added height
        padding: "20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#1a1a1a",
        // backdropFilter: "blur(10px)",
        // boxShadow: "0 0 10px rgba(255, 255, 255, 0.5)",
        // zIndex: 9999, // Set a high z-index value
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <Avatar
          src={user?.profile}
          alt="User Profile"
          sx={{ width: 30, height: 30, marginRight: "10px" }}
        />
        <Typography sx={{ color: "black" }}>Hello, {user?.username}</Typography>
      </div>
      <Button 
        variant="contained" 
        onClick={() => logout(user?.user_id)}
        sx={{ minWidth: '80px', height: '36px', fontSize: '0.8rem', fontWeight: 'bold', backgroundColor: "#1976d2", color: "#fff", '&:hover': { backgroundColor: "#1565c0" } }} // Adjusted button dimensions and styling
      >
        Logout
      </Button>
    </Paper>
  );
};

export default Header;
