import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import api from "../api/api"
import useRequireAuth from "../hooks/useRequireAuth"
import AddExercise from "./AddExercise"
import ExerciseCard from "./ExerciseCard"
import "../styles/muscle.css"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

export default function Muscle({ muscleGroup }) {
	useRequireAuth()
	const navigate = useNavigate()

	const [selectedDate, setSelectedDate] = useState(() => {
		const saved = localStorage.getItem("selectedDate")
		return saved ? new Date(saved) : new Date()
	})

	const [userCreatedAt, setUserCreatedAt] = useState(null)
	const [exercises, setExercises] = useState([])
	const [showAddForm, setShowAddForm] = useState(false)

	function formatDateLocal(date) {
		const year = date.getFullYear()
		const month = String(date.getMonth() + 1).padStart(2, "0")
		const day = String(date.getDate()).padStart(2, "0")
		return `${year}-${month}-${day}`
	}

	const formattedDate = formatDateLocal(selectedDate)
	
	// Load user creation date from localStorage
	useEffect(() => {
		const user = JSON.parse(localStorage.getItem("user"))
		if (user?.createdAt) setUserCreatedAt(new Date(user.createdAt))
	}, [])

	// Fetch exercises whenever date or muscleGroup changes
	useEffect(() => {
		const token = localStorage.getItem("token")
		if (!token) {
			navigate("/Login")
			return
		}

		const fetchExercises = async () => {
			try {
				const res = await api.get(`/exercises/${muscleGroup}?date=${formattedDate}`)
				setExercises(res.data)
			} catch (err) {
				console.log(err)
			}
		}

		fetchExercises()
	}, [selectedDate, muscleGroup, navigate, formattedDate])

	// Update selected date and save in localStorage
	const handleDateChange = (date) => {
		setSelectedDate(date)
		localStorage.setItem("selectedDate", date.toISOString())
	}

	// Add new exercise
	const handleAddExercise = async (exercise) => {
		try {
			const res = await api.post("/exercises", {
				...exercise,
				muscleGroup,
				date: formattedDate,
			})
			setExercises(prev => [...prev, res.data])
			setShowAddForm(false)
		} catch (err) {
			console.log(err)
		}
	}

	// Update exercise
	const handleExerciseUpdate = async (index, updated) => {
		try {
			const ex = exercises[index]
			const res = await api.put(`/exercises/${ex._id}`, updated, {
				headers: {
					"Content-Type" : "application/json"
				}
			})
			setExercises(prev => {
				const newArr = [...prev]
				newArr[index] = res.data
				return newArr
			})
		} catch (err) {
			console.log(err)
		}
	}

	// Delete exercise
	const handleDeleteExercise = async (index) => {
		try {
			const ex = exercises[index]
			await api.delete(`/exercises/${ex._id}`)
			setExercises(prev => prev.filter((_, i) => i !== index))
		} catch (err) {
			console.log(err)
		}
	}

	return (
		<div>
			<div className="backBtn">
				<button onClick={() => navigate(-1)}>Back</button>
			</div>

			<h1 className="header">{muscleGroup} Workout</h1>
			<p>Select or add exercises for your {muscleGroup.toLowerCase()} workout, or view previous workouts.</p>

			<div className="date">
				<DatePicker
					selected={selectedDate}
					onChange={handleDateChange}
					minDate={userCreatedAt}
					maxDate={new Date()}
				/>
			</div>

			<div className="addBtn">
				{!showAddForm && <button onClick={() => setShowAddForm(true)}>+ Add Exercise</button>}
				{showAddForm && <AddExercise onAdd={handleAddExercise} onCancel={() => setShowAddForm(false)} />}
			</div>

			<h2>Exercises for {formattedDate}</h2>
			<div className="container">
				{exercises.map((ex, index) => (
					<ExerciseCard
						key={ex._id}
						exercise={ex}
						index={index}
						onUpdate={(updated) => handleExerciseUpdate(index, updated)}
						onComplete={(updated) => handleExerciseUpdate(index, updated)}
						onDelete={() => handleDeleteExercise(index)}
					/>
				))}
			</div>
		</div>
	)
}