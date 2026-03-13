import express from "express";
import Exercise from "../models/Exercise.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Get exercises by muscle group
router.get("/:muscleGroup", verifyToken, async (req, res) => {
    try {
        const exercises = await Exercise.find({ muscleGroup: req.params.muscleGroup })
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

        exercise.name = name;
        exercise.weight = weight;
        exercise.sets = sets;
        exercise.reps = reps;
        exercise.muscleGroup = muscleGroup;

        const updatedExercise = await exercise.save();
        res.json(updatedExercise);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

export default router;