import express from "express";
import Meals from "../models/Meals.js";

const router = express.Router();

// Get all meals for a user
router.get("/:userId", async (req, res) => {
  try {
    const meals = await Meals.find({ userId: req.params.userId });
    res.json(meals);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new meal
router.post("/", async (req, res) => {
  const { userId, description, calories, protein, carbs, fat } = req.body;
  const meal = new Meals({ 
    userId, 
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
router.delete("/:id", async (req, res) => {
  try {
    await Meals.findByIdAndDelete(req.params.id);
    res.json({ message: "Meal deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;