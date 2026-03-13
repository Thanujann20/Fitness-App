import express from "express";
import Meals from "../models/Meals.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Get all meals for a user
router.get("/", verifyToken, async (req, res) => {
  try {
    const meals = await Meals.find({ userId: req.user.id });
    res.json(meals);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new meal
router.post("/", verifyToken, async (req, res) => {
  const { description, calories, protein, carbs, fat } = req.body;
  const meal = new Meals({ 
    userId: req.user.id,
    description, 
    calories, 
    protein, 
    carbs, 
    fat 
  });
  try {
    const savedMeal = await meal.save();
    res.status(201).json(savedMeal);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a meal
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const meal = await Meals.findById(req.params.id);
    if (!meal) {
      return res.status(404).json({ message: "Meal not found" });
    }
    if (meal.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Access denied" });
    }
    await Meals.findByIdAndDelete(req.params.id);
    res.json({ message: "Meal deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;