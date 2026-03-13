import express from "express";
import User from "../models/User.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Create a user
router.post("/", verifyToken, async (req, res) => {
  const { username, email, password } = req.body;
  const user = new User({ username, email, password });
  try {
    const savedUser = await user.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;