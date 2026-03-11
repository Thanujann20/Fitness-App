import express from "express";
import Exercise from "../models/Exercise.js";

const router = express.Router();

// Get exercises by muscle group
router.get("/:muscleGroup", async (req, res) => {
    try {
        const exercises = await Exercise.find({ muscleGroup: req.params.muscleGroup });
        res.json(exercises);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a new exercise
router.post("/", async (req, res) => {
    const { userId, name, weight, sets, reps, muscleGroup } = req.body;
    const exercise = new Exercise({ userId, name, weight, sets, reps, muscleGroup });
    try {
        const savedExercise = await exercise.save();
        res.status(201).json(savedExercise);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete an exercise
router.delete("/:id", async (req, res) => {
    try {
        await Exercise.findByIdAndDelete(req.params.id);
        res.json({ message: "Exercise deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update an exercise   
router.put("/:id", async (req, res) => {
    const { name, weight, sets, reps, muscleGroup } = req.body;
    try {
        const updatedExercise = await Exercise.findByIdAndUpdate(
            req.params.id,
            { name, weight, sets, reps, muscleGroup },
            { new: true }
        );
        res.json(updatedExercise);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

export default router;