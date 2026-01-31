import React, { useState, useEffect, useContext } from "react";
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
import { UserContext } from "../context/UserContext";

export default function Dashboard() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const { user, setUser, setToken, token } = useContext(UserContext);
  const [messages, setMessages] = useState([]);

  const fetchMessages = async () => {
    try {
      const res = await axios.get(
        import.meta.env.VITE_BACKEND_URL + "/api/v1/notes/note",
        {
          headers: {
            "x-auth-token": token,
          },
        },
      );

      if (res.status === 200) {
        setMessages(res.data.notes);
      } else {
        toast.error("Failed to fetch messages");
      }
    } catch (error) {
      toast.error("Failed to fetch messages: " + error.message);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const sendMessage = async () => {
    if (!message) return toast.error("Message cannot be empty");

    try {
      const res = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/api/v1/notes/note",
        { text: message },
        {
          headers: {
            "x-auth-token": token,
          },
        },
      );
      if (res.status === 201) {
        toast.success("Message sent successfully");
        setMessage("");
        await fetchMessages();
      } else {
        toast.error("Failed to send message");
      }
    } catch (error) {
      toast.error("Failed to send message: " + error.message);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setToken(null);
    navigate("/login", { replace: true });
  };

  return (
    <Container sx={{ mt: 2 }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Box>
          <Typography variant="h5">Dashboard</Typography>
          <Typography variant="body2" color="text.secondary">
            Logged in as <strong>{user?.name}</strong> ({user?.email})
          </Typography>
        </Box>
        <Button color="error" variant="outlined" onClick={logout}>
          Logout
        </Button>
      </Box>

      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography variant="h6" mb={1}>
          Post an Anonymous Message
        </Typography>
        <Box display="flex" gap={2}>
          <TextField
            fullWidth
            placeholder="Write something anonymously..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button variant="contained" onClick={sendMessage}>
            Send
          </Button>
        </Box>
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" mb={2}>
          Anonymous Feed
        </Typography>
        <Box sx={{ maxHeight: 400, overflowY: "auto" }}>
          {messages.map((msg) => (
            <Box
              key={msg.id}
              sx={{ p: 1, mb: 1, borderBottom: "1px solid #eee" }}
            >
              <Typography variant="body1">{msg.text}</Typography>
              <Typography variant="caption" color="text.secondary">
                {new Date(msg.createdAt).toLocaleString()}
              </Typography>
            </Box>
          ))}
        </Box>
      </Paper>
    </Container>
  );
}
