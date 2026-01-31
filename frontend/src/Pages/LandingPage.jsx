import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
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

export default function Landing() {
  const navigate = useNavigate();

  useEffect(() => {
    gsap.from(".hero", { opacity: 0, y: 60, duration: 1 });
  }, []);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #1976d2, #0d47a1)",
        color: "white",
      }}
    >
      <Container className="hero" sx={{ pt: 15 }}>
        <Typography variant="h2" fontWeight="bold" gutterBottom>
          Build Secure Apps Faster 🚀
        </Typography>
        <Typography variant="h6" sx={{ maxWidth: 600, mb: 4 }}>
          A modern authentication system with clean UI, JWT security and
          scalable architecture.
        </Typography>
        <Box display="flex" gap={2}>
          <Button
            size="large"
            variant="contained"
            color="secondary"
            onClick={() => navigate("/signup")}
          >
            Get Started
          </Button>
          <Button
            size="large"
            variant="outlined"
            sx={{ color: "white", borderColor: "white" }}
            onClick={() => navigate("/login")}
          >
            Login
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
