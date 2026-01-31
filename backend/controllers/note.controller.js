import Note from "../models/Note.model.js";

export const getAllNotes = async (req, res) => {
  // Get the 100 most recent notes from the database
  try {
    const notes = await Note.find().sort({ createdAt: -1 }).limit(30);
    res.status(200).json({ isSuccess: true, notes });
  } catch (error) {
    res.status(500).json({ isSuccess: false, error: error.message });
  }
};

export const createNote = async (req, res) => {
  // Create a new note in the database
  try {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ error: "Text field is required" });
    }
    const newNote = new Note({ text });
    await newNote.save();
    res.status(201).json({ isSuccess: true, note: newNote });
  } catch (error) {
    res.status(500).json({ isSuccess: false, error: error.message });
  }
};
