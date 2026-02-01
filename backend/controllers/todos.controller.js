import Todo from "../models/Todo.model.js";

export const createTodo = async (req, res) => {
  try {
    const { title, description } = req.body;
    const userId = req.user.id;

    if (!title || !userId)
      return res.status(400).json({ message: "Title and userId are required" });

    const newTodo = new Todo({
      title,
      description,
      userId,
    });
    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (error) {
    console.error("Error creating todo:", error);
    res.status(500).json({ message: error.message });
  }
};

export const getTodos = async (req, res) => {
  try {
    const userId = req.user.id;
    const todos = await Todo.find({ userId })
      .populate("userId")
      .sort({ createdAt: -1 });
    res.status(200).json({ todos });
  } catch (error) {
    console.error("Error fetching todos:", error);
    res.status(500).json({ message: error.message });
  }
};

export const updateTodo = async (req, res) => {
  try {
    const { title, description, completed, id } = req.body;
    const userId = req.user.id;

    if (!id || !userId)
      return res
        .status(400)
        .json({ message: "Todo ID and userId are required" });

    const updateTodo = await Todo.findOneAndUpdate(
      { _id: id, userId },
      { title, description, completed },
      { new: true },
    );
    if (!updateTodo)
      return res
        .status(404)
        .json({ message: "Todo not found or unauthorized" });
    res.status(200).json(updateTodo);
  } catch (error) {
    console.error("Error updating todo:", error);
    res.status(500).json({ message: error.message });
  }
};

export const deleteTodo = async (req, res) => {
  try {
    const { id } = req.body;
    const userId = req.user.id;
    if (!id || !userId)
      return res
        .status(400)
        .json({ message: "Todo ID and userId are required" });

    const deletedTodo = await Todo.findOneAndDelete({ _id: id, userId });
    if (!deletedTodo)
      return res
        .status(404)
        .json({ message: "Todo not found or unauthorized" });
    res.status(200).json({ message: "Todo deleted successfully" });
  } catch (error) {
    console.error("Error deleting todo:", error);
    res.status(500).json({ message: error.message });
  }
};

export const toggleTodoCompletion = async (req, res) => {
  const { id } = req.body;
  const userId = req.user.id;
  try {
    if (!id || !userId)
      return res
        .status(400)
        .json({ message: "Todo ID and userId are required" });
    const todo = await Todo.findOne({ _id: id, userId });
    if (!todo) {
      return res
        .status(404)
        .json({ message: "Todo not found or unauthorized" });
    }
    todo.completed = !todo.completed;
    await todo.save();
    res.status(200).json(todo);
  } catch (error) {
    console.error("Error toggling todo completion:", error);
    res.status(500).json({ message: error.message });
  }
};
