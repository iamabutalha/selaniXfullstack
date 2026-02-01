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

  const [todoText, setTodoText] = useState("");
  const [todoDate, setTodoDate] = useState("");
  const [filter, setFilter] = useState("all");
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");
  const [editDate, setEditDate] = useState("");

  console.log("User:", user);
  console.log("Token:", token);

  // 🔹 Demo Todos (API later)
  const [todos, setTodos] = useState([
    {
      id: 1,
      text: "Finish Todo Dashboard UI",
      date: "2026-02-02",
      completed: false,
    },
    {
      id: 2,
      text: "Practice DSA",
      date: "2026-02-03",
      completed: true,
    },
  ]);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        let res = await axios.get(
          import.meta.env.VITE_BACKEND_URL + "/api/v1/todos/todo",
          {
            headers: {
              "x-auth-token": token,
            },
          },
        );

        if (res.status === 200) {
          setTodos(res.data.todos);
        } else {
          toast.error("Failed to fetch todos");
        }
      } catch (error) {
        toast.error("Error fetching todos");
      }
    };
    fetchTodos();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setToken(null);
    navigate("/login", { replace: true });
  };

  /* ---------------- ADD TODO ---------------- */
  const addTodo = () => {
    if (!todoText || !todoDate) {
      return toast.error("Todo text and date are required");
    }

    setTodos([
      ...todos,
      {
        id: Date.now(),
        text: todoText,
        date: todoDate,
        completed: false,
      },
    ]);

    setTodoText("");
    setTodoDate("");
    toast.success("Todo added");
  };

  /* ---------------- TOGGLE COMPLETE ---------------- */
  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  /* ---------------- DELETE TODO ---------------- */
  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
    toast.success("Todo deleted");
  };

  /* ---------------- EDIT TODO ---------------- */
  const startEdit = (todo) => {
    setEditId(todo.id);
    setEditText(todo.text);
    setEditDate(todo.date);
  };

  const saveEdit = (id) => {
    if (!editText || !editDate) {
      return toast.error("Fields cannot be empty");
    }

    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, text: editText, date: editDate } : todo,
      ),
    );

    setEditId(null);
    toast.success("Todo updated");
  };

  const filteredTodos = useMemo(() => {
    if (filter === "completed") return todos.filter((t) => t.completed);
    if (filter === "pending") return todos.filter((t) => !t.completed);
    return todos;
  }, [filter, todos]);

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Toaster />

      {/* Header */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={4}
      >
        <Box>
          <Typography variant="h5">Todo Dashboard</Typography>
          <Typography variant="body2" color="text.secondary">
            Logged in as <strong>{user?.name}</strong> ({user?.email})
          </Typography>
        </Box>
        <Button color="error" variant="outlined" onClick={logout}>
          Logout
        </Button>
      </Box>

      {/* Add Todo */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" mb={2}>
          Add Todo
        </Typography>

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

      {/* Filters */}
      <Box mb={2} display="flex" justifyContent="center">
        <ToggleButtonGroup
          value={filter}
          exclusive
          onChange={(e, val) => val && setFilter(val)}
        >
          <ToggleButton value="all">All</ToggleButton>
          <ToggleButton value="completed">Completed</ToggleButton>
          <ToggleButton value="pending">Pending</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      {/* Todo List */}
      <Stack spacing={2}>
        {filteredTodos.length === 0 && (
          <Typography align="center" color="text.secondary">
            No todos found
          </Typography>
        )}

        {filteredTodos.map((todo) => (
          <Card
            key={todo.id}
            sx={{
              opacity: todo.completed ? 0.55 : 1,
              transition: "0.3s",
            }}
          >
            <CardContent>
              {editId === todo.id ? (
                /* EDIT MODE */
                <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                  <TextField
                    fullWidth
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                  />
                  <TextField
                    type="date"
                    value={editDate}
                    onChange={(e) => setEditDate(e.target.value)}
                  />
                  <IconButton color="success" onClick={() => saveEdit(todo.id)}>
                    <FiSave size={18} />
                  </IconButton>
                  <IconButton onClick={() => setEditId(null)}>
                    <FiX size={18} />
                  </IconButton>
                </Stack>
              ) : (
                /* VIEW MODE */
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Box>
                    <Typography
                      variant="body1"
                      sx={{
                        cursor: "pointer",
                        textDecoration: todo.completed
                          ? "line-through"
                          : "none",
                      }}
                      onClick={() => toggleTodo(todo.id)}
                    >
                      {todo.text}
                    </Typography>

                    <Typography variant="caption" color="text.secondary">
                      Due: {todo.date}
                    </Typography>
                  </Box>

                  <Stack direction="row" spacing={1} alignItems="center">
                    <Chip
                      label={todo.completed ? "Completed" : "Pending"}
                      color={todo.completed ? "success" : "warning"}
                      size="small"
                    />
                    <IconButton onClick={() => startEdit(todo)}>
                      <FiEdit size={18} />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => deleteTodo(todo.id)}
                    >
                      <FiTrash2 size={18} />
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
