import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../services/api"; // Import register API function
import { TextField, Button, Box, Typography, Container } from "@mui/material";

const Register = () => {
  const navTo = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "user", // Set role to "user" by default
    full_name: "" // Initialize full_name as an empty string
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await register(formData); // Call the register API function with form data
      // Registration successful, redirect to login page
      navTo("/login");
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <TextField
            label="Full Name"
            name="full_name"
            value={formData.full_name}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
          />
          <TextField
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
          />
          <TextField
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
          />
          <TextField
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Register
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Register;
