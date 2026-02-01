import express from "express";
import { authUser } from "../middlewares/authUser.js";
import {
  createTodo,
  deleteTodo,
  getTodos,
  toggleTodoCompletion,
  updateTodo,
} from "../controllers/todos.controller.js";
const router = express.Router();

// @route('/todos')
// @desc Get all todos
// @access Public
router.get("/todo", authUser, getTodos);
router.post("/todo", authUser, createTodo);
router.put("/todo", authUser, updateTodo);
router.patch("/todo", authUser, toggleTodoCompletion);
router.delete("/todo", authUser, deleteTodo);
export default router;
