import express from "express";
import { createNote, getAllNotes } from "../controllers/note.controller.js";
import { authUser } from "../middlewares/authUser.js";

const router = express.Router();

router.get("/note", getAllNotes);
router.post("/note", authUser, createNote);

export default router;
