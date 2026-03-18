import express from "express"
import Exercise from "../models/Exercise.js"
import User from "../models/User.js"
import { verifyToken } from "../middleware/authMiddleware.js"

const router = express.Router()

// Get exercises for a specific muscle group
router.get("/:muscleGroup", verifyToken, async (req, res) => {
	const { date } = req.query

	try {
		const selectedDate = date ? new Date(date + "T00:00:00") : new Date()
		selectedDate.setHours(0, 0, 0, 0) 

		const nextDate = new Date(selectedDate)
		nextDate.setDate(nextDate.getDate() + 1)

		const user = await User.findById(req.user.id)
		if (!user) return res.status(404).json({ message: "User not found" })

		const userCreatedAt = new Date(user.createdAt)
		userCreatedAt.setHours(0, 0, 0, 0)

		if (selectedDate < userCreatedAt) return res.json([])

		// Fetch exercises for the day
		let exercises = await Exercise.find({
			muscleGroup: req.params.muscleGroup,
			userId: req.user.id,
			date: { $gte: selectedDate, $lt: nextDate },
		})

		// Only copy last workout if no exercises exist
        if (exercises.length === 0 && selectedDate < new Date()) {
            const lastWorkout = await Exercise.findOne({
                muscleGroup: req.params.muscleGroup,
                userId: req.user.id,
                date: { $lt: selectedDate },
            }).sort({ date: -1 })

            if (lastWorkout) {
                const lastDate = new Date(lastWorkout.date)
                lastDate.setHours(0, 0, 0, 0)

                const previousExercises = await Exercise.find({
                    muscleGroup: req.params.muscleGroup,
                    userId: req.user.id,
                    date: {
                        $gte: lastDate,
                        $lt: new Date(lastDate.getTime() + 86400000),
                    },
                })

                // check again before inserting
                const stillEmpty = await Exercise.findOne({
                    userId: req.user.id,
                    muscleGroup: req.params.muscleGroup,
                    date: { $gte: selectedDate, $lt: nextDate }
                })

                if (!stillEmpty) {
                    const copies = previousExercises.map(ex => ({
                        userId: ex.userId,
                        name: ex.name,
                        weight: ex.weight,
                        sets: ex.sets,
                        reps: ex.reps,
                        muscleGroup: ex.muscleGroup,
                        completed: false,
                        date: selectedDate,
                    }))

                    if (copies.length) {
                        exercises = await Exercise.insertMany(copies)
                    }
                }
            }
        }

		res.json(exercises)
	} catch (err) {
		console.error(err)
		res.status(500).json({ message: err.message })
	}
})

// Get most recent exercises for a muscle group
router.get("/:muscleGroup/recent", verifyToken, async (req, res) => {
    try {
        const lastExercises = await Exercise.find({
            muscleGroup: req.params.muscleGroup,
            userId: req.user.id,
        })
            .sort({ date: -1 })
            .limit(6)

        res.json(lastExercises)
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: err.message })
    }
})

// Create a new exercise
router.post("/", verifyToken, async (req, res) => {
    const { name, weight, sets, reps, muscleGroup, date } = req.body

    const selectedDate = date ? new Date(date + "T00:00:00") : new Date()
    selectedDate.setHours(0, 0, 0, 0)

    const exercise = new Exercise({
        userId: req.user.id,
        name,
        weight,
        sets,
        reps,
        muscleGroup,
        date: selectedDate,
    })

    try {
        const savedExercise = await exercise.save()
        res.status(201).json(savedExercise)
    } catch (err) {
        console.error(err)
        res.status(400).json({ message: err.message })
    }
})

// Delete an exercise
router.delete("/:id", verifyToken, async (req, res) => {
    try {
        const exercise = await Exercise.findById(req.params.id)
        if (!exercise) return res.status(404).json({ message: "Exercise not found" })
        if (exercise.userId.toString() !== req.user.id) return res.status(403).json({ message: "Access denied" })

        await Exercise.findByIdAndDelete(req.params.id)
        res.json({ message: "Exercise deleted" })
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: err.message })
    }
})

// Update an exercise
router.put("/:id", verifyToken, async (req, res) => {
    const { name, weight, sets, reps, muscleGroup, completed } = req.body

    try {
        const exercise = await Exercise.findById(req.params.id)
        if (!exercise) return res.status(404).json({ message: "Exercise not found" })
        if (exercise.userId.toString() !== req.user.id) return res.status(403).json({ message: "Access denied" })

        exercise.name = name ?? exercise.name
        exercise.weight = weight ?? exercise.weight
        exercise.sets = sets ?? exercise.sets
        exercise.reps = reps ?? exercise.reps
        exercise.muscleGroup = muscleGroup ?? exercise.muscleGroup
        if (typeof completed === "boolean") exercise.completed = completed

        const updatedExercise = await exercise.save()
        res.json(updatedExercise)
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: err.message, stack: err.stack })
    }
})

export default router