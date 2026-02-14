import express from "express";
import {
  getAllUsers,
  getUserProfile,
  loginUser,
  registerUser,
  updateUserProfilePic,
} from "../controllers/user.controller.js";
import { authUser } from "../middlewares/authUser.js";

const router = express.Router();
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", authUser, getUserProfile);
// router.put("/update-profile", authUser, updateProfile);
router.put("/update-profile-picture", authUser, updateUserProfilePic);
router.get("/users", authUser, getAllUsers);
router.get("/check", authUser, (req, res) => {
  res.status(200).json({ message: "Authenticated", user: req.user });
});
export default router;
