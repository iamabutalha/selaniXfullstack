import Todo from "../models/Todo.model.js";
import { model } from "./ai.js";

export const generateDescription = async (title) => {
  try {
    const prompt = `
    Generate a short todo description for this this task:
    "${title}"

    make sure its only 10 words strickly
    `;

    const result = await model.generateContent(prompt);

    return result.response.text();
  } catch (error) {
    console.log("Error in generateDescription", error);
  }
};

export const generateTodoDescription = async (title, todoId) => {
  try {
    const description = await generateDescription(title);
    await Todo.findByIdAndUpdate(todoId, {
      description,
    });
    console.log(description);
  } catch (error) {
    console.log("Error in generateTodoDescription ", error);
  }
};
