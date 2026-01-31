import express from "express";
import {
  getAllUsers,
  getUserProfile,
  loginUser,
  registerUser,
} from "../controllers/user.controller.js";
import { authUser } from "../middlewares/authUser.js";

const router = express.Router();
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", authUser, getUserProfile);
router.get("/users", authUser, getAllUsers);
export default router;
