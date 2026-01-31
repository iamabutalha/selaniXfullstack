import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { Toaster, toast } from "react-hot-toast";
import gsap from "gsap";

const Signup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", name: "", password: "" });

  useEffect(() => {
    gsap.from(".register-box", { opacity: 0, y: 40, duration: 0.8 });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.name || !form.password) {
      return toast.error("All fields are required");
    }
    if (!/\S+@\S+\.\S+/.test(form.email)) {
      return toast.error("Invalid email format");
    }
    if (form.password.length < 6) {
      return toast.error("Password must be at least 6 characters");
    }

    // API call here
    try {
      const res = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/api/v1/users/register",
        form,
      );
      if (res.status === 201) {
        toast.success("Registered successfully");
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } else {
        toast.error("Registration failed");
        return;
      }
    } catch (error) {
      toast.error("Registration failed: " + error.response.data.message);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box className="register-box" sx={{ mt: 10, p: 4, boxShadow: 3 }}>
        <Typography variant="h4" mb={2}>
          Register
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email"
            margin="normal"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            value={form.email}
          />
          <TextField
            fullWidth
            label="Name"
            margin="normal"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            value={form.name}
          />
          <TextField
            fullWidth
            type="password"
            label="Password"
            margin="normal"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <Button fullWidth type="submit" variant="contained" sx={{ mt: 2 }}>
            Register
          </Button>
          <Button
            fullWidth
            variant="outlined"
            sx={{ mt: 2 }}
            onClick={() => navigate("/login")}
          >
            Login Instead ?
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Signup;
