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
        background:
          "linear-gradient(90deg,rgba(42, 123, 155, 1) 0%, rgba(87, 199, 133, 1) 50%, rgba(237, 221, 83, 1) 100%)",
        color: "white",
      }}
    >
      <Container className="hero" sx={{ pt: 15 }}>
        <Typography variant="h2" fontWeight="bold" gutterBottom>
          Build Secure Apps Faster 🚀
        </Typography>
        <Typography variant="h6" sx={{ maxWidth: 600, mb: 4 }}>
          An anonymous messaging platform that prioritizes your privacy and
          security.
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
