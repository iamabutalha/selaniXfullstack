import React, { useState, useContext, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  Card,
  CardContent,
  Chip,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  IconButton,
} from "@mui/material";
import { FiEdit, FiTrash2, FiSave, FiX } from "react-icons/fi";
import { UserContext } from "../context/UserContext";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, setUser, setToken, token } = useContext(UserContext);

  const [todos, setTodos] = useState([]);
  const [todoText, setTodoText] = useState("");
  const [todoDate, setTodoDate] = useState("");
  const [filter, setFilter] = useState("all");

  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");
  const [editDate, setEditDate] = useState("");

  /* ================= FETCH TODOS ================= */
  const fetchTodos = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/todos/todo`,
        {
          headers: { "x-auth-token": token },
        },
      );
      if (res.status === 200) setTodos(res.data.todos);
    } catch {
      toast.error("Failed to fetch todos");
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  /* ================= LOGOUT ================= */
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setToken(null);
    navigate("/login", { replace: true });
  };

  /* ================= ADD TODO (POST) ================= */
  const addTodo = async () => {
    if (!todoText || !todoDate)
      return toast.error("Todo text and date are required");

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/todos/todo`,
        {
          title: todoText,
          date: todoDate,
          userId: user._id,
        },
        {
          headers: { "x-auth-token": token },
        },
      );

      if (res.status === 201) {
        toast.success("Todo added");
        setTodoText("");
        setTodoDate("");
        fetchTodos();
      }
    } catch {
      toast.error("Failed to add todo");
    }
  };

  /* ================= TOGGLE COMPLETE (PATCH) ================= */
  const toggleTodo = async (id, completed) => {
    try {
      const res = await axios.patch(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/todos/todo/`,
        { id },
        {
          headers: { "x-auth-token": token },
        },
      );
      if (res.status === 200) fetchTodos();
    } catch {
      toast.error("Failed to toggle todo");
    }
  };

  const updateTodo = async (id) => {
    if (!editText || !editDate) return toast.error("Fields cannot be empty");

    try {
      const res = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/todos/todo/`,
        {
          title: editText,
          date: editDate,
          id,
          isCompleted: false,
        },
        {
          headers: { "x-auth-token": token },
        },
      );

      if (res.status === 200) {
        toast.success("Todo updated");
        setEditId(null);
        fetchTodos();
      } else {
        toast.error("Failed to update todo11");
      }
    } catch (error) {
      toast.error("Failed to update todo");
      console.log(error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/todos/todo`,

        {
          data: { id },
          headers: { "x-auth-token": token },
        },
      );

      if (res.status === 200) {
        toast.success("Todo deleted");
        fetchTodos();
      }
    } catch {
      toast.error("Failed to delete todo");
    }
  };

  const startEdit = (todo) => {
    setEditId(todo._id);
    setEditText(todo.title);
    setEditDate(todo.date);
  };

  const filteredTodos = useMemo(() => {
    if (filter === "completed") return todos.filter((t) => t.completed);
    if (filter === "pending") return todos.filter((t) => !t.completed);
    return todos;
  }, [filter, todos]);

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Toaster />

      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" mb={4}>
        <Box>
          <Typography variant="h5">Todo Dashboard</Typography>
          <Typography variant="body2" color="text.secondary">
            Logged in as <strong>{user?.name}</strong> ({user?.email})
          </Typography>
        </Box>
        <Button variant="outlined" color="error" onClick={logout}>
          Logout
        </Button>
      </Box>

      {/* ADD TODO */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <TextField
            fullWidth
            label="Todo"
            value={todoText}
            onChange={(e) => setTodoText(e.target.value)}
          />
          <TextField
            type="date"
            label="Date"
            InputLabelProps={{ shrink: true }}
            value={todoDate}
            onChange={(e) => setTodoDate(e.target.value)}
          />
          <Button variant="contained" onClick={addTodo}>
            Add
          </Button>
        </Stack>
      </Paper>

      {/* FILTER */}
      <Box display="flex" justifyContent="center" mb={2}>
        <ToggleButtonGroup
          exclusive
          value={filter}
          onChange={(e, val) => val && setFilter(val)}
        >
          <ToggleButton value="all">All</ToggleButton>
          <ToggleButton value="completed">Completed</ToggleButton>
          <ToggleButton value="pending">Pending</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      {/* TODO LIST */}
      <Stack spacing={2}>
        {filteredTodos.map((todo) => (
          <Card key={todo._id} sx={{ opacity: todo.completed ? 0.55 : 1 }}>
            <CardContent>
              {editId === todo._id ? (
                <Stack direction="row" spacing={2} alignItems="center">
                  <TextField
                    fullWidth
                    value={editText || todoText}
                    onChange={(e) => setEditText(e.target.value)}
                  />
                  <TextField
                    type="date"
                    value={editDate || todo.createdAt.slice(0, 10)}
                    onChange={(e) => setEditDate(e.target.value)}
                  />
                  <IconButton onClick={() => updateTodo(todo._id)}>
                    <FiSave />
                  </IconButton>
                  <IconButton onClick={() => setEditId(null)}>
                    <FiX />
                  </IconButton>
                </Stack>
              ) : (
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Box>
                    <Typography
                      sx={{
                        cursor: "pointer",
                        textDecoration: todo.completed
                          ? "line-through"
                          : "none",
                      }}
                      onClick={() => toggleTodo(todo._id, todo.completed)}
                    >
                      {todo.title}
                    </Typography>
                    <Typography variant="caption">
                      Due: {new Date(todo.createdAt).toLocaleDateString()}
                    </Typography>
                  </Box>

                  <Stack direction="row" spacing={1} alignItems="center">
                    <Chip
                      label={todo.completed ? "Completed" : "Pending"}
                      color={todo.completed ? "success" : "warning"}
                      size="small"
                    />
                    <IconButton onClick={() => startEdit(todo)}>
                      <FiEdit />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => deleteTodo(todo._id)}
                    >
                      <FiTrash2 />
                    </IconButton>
                  </Stack>
                </Box>
              )}
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Container>
  );
}
