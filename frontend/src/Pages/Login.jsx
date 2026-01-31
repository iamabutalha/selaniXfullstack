import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import { Container, TextField, Button, Typography, Box } from "@mui/material";
import { toast } from "react-hot-toast";
import gsap from "gsap";
import { UserContext } from "../context/UserContext";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setToken, setUser } = useContext(UserContext);

  useEffect(() => {
    gsap.from(".login-box", { opacity: 0, scale: 0.9, duration: 0.7 });
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) return toast.error("All fields required");

    // API call here
    try {
      const res = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/api/v1/users/login",
        { email, password },
      );

      if (res.status === 200) {
        setToken(res.data.token);
        localStorage.setItem("token", res.data.token);
        setUser(res.data.user);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        navigate("/dashboard");
        toast.success("Login successful");
      } else {
        toast.error("Login failed");
      }
    } catch (error) {
      toast.error("Login failed: " + error.message);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box className="login-box" sx={{ mt: 10, p: 4, boxShadow: 3 }}>
        <Typography variant="h4" mb={2}>
          Login
        </Typography>
        <form onSubmit={handleLogin}>
          <TextField
            fullWidth
            label="Email"
            margin="normal"
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            fullWidth
            type="password"
            label="Password"
            margin="normal"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button fullWidth type="submit" variant="contained" sx={{ mt: 2 }}>
            Login
          </Button>

          <Button
            fullWidth
            variant="outlined"
            sx={{ mt: 2 }}
            onClick={() => navigate("/signup")}
          >
            Create Account
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Login;
