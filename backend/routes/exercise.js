import express from "express";
import Exercise from "../models/Exercise.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Get exercises by muscle group and user
router.get("/:muscleGroup", verifyToken, async (req, res) => {
    try {
        const exercises = await Exercise.find({ muscleGroup: req.params.muscleGroup, userId: req.user.id })
        res.json(exercises);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a new exercise
router.post("/", verifyToken, async (req, res) => {
    const { name, weight, sets, reps, muscleGroup } = req.body;
    const exercise = new Exercise({ 
        userId: req.user.id, 
        name, 
        weight, 
        sets, 
        reps, 
        muscleGroup });
    try {
        const savedExercise = await exercise.save()
        res.status(201).json(savedExercise);
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
});

// Delete an exercise
router.delete("/:id", verifyToken, async (req, res) => {
    try {
        const exercise = await Exercise.findById(req.params.id);
        if (!exercise) {
            return res.status(404).json({ message: "Exercise not found" })
        }
        if (exercise.userId.toString() !== req.user.id) {
            return res.status(403).json({ message: "Access denied" })
        }
        await Exercise.findByIdAndDelete(req.params.id);
        res.json({ message: "Exercise deleted" })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
});

// Update an exercise   
router.put("/:id", verifyToken, async (req, res) => {
    const { name, weight, sets, reps, muscleGroup } = req.body;
    try {
        const exercise = await Exercise.findById(req.params.id);
        if (!exercise) return res.status(404).json({ message: "Exercise not found" });

        if (exercise.userId.toString() !== req.user.id) {
            return res.status(403).json({ message: "Access denied" });
        }

        exercise.name = name ?? exercise.name;
        exercise.weight = weight ?? exercise.weight;
        exercise.sets = sets ?? exercise.sets;
        exercise.reps = reps ?? exercise.reps;
        exercise.muscleGroup = muscleGroup ?? exercise.muscleGroup;
        if (typeof req.body.completed === "boolean") {
            exercise.completed = req.body.completed;
        }

        const updatedExercise = await exercise.save();
        res.json(updatedExercise);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

export default router;