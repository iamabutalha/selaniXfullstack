import express from "express";
import userRoutes from "./routes/user.routes.js";
import notesRoutes from "./routes/note.routes.js";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import cors from "cors";
import todoRoutes from "./routes/todo.routes.js";
dotenv.config();
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "x-auth-token"],
  }),
);

connectDB();
const PORT = process.env.PORT || 5000;
app.get("/test", (req, res) => {
  res.send("API is working");
});

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/notes", notesRoutes);
app.use("/api/v1/todos", todoRoutes);

app.listen(PORT, () => {
  console.log(`Server is runnning on ${PORT}`);
});
