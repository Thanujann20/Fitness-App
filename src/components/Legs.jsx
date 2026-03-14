import { useState, useEffect } from "react"
import api from "../api/api"
import { useNavigate } from "react-router-dom"
import useRequireAuth from "../hooks/useRequireAuth"
import "../styles/muscle.css"
import AddExercise from "./addExercise"
import ExerciseCard from "./ExerciseCard"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

export default function Legs() {
    useRequireAuth()
    const navigate = useNavigate()

    const [exercises, setExercises] = useState([])
    const [selectedDate, setSelectedDate] = useState(new Date())
    const formattedDate = selectedDate.toISOString().split("T")[0]

    const handleDateChange = (date) => {
        setSelectedDate(date)
    }

    // Fetch exercises from backend
    useEffect(() => {
        const token = localStorage.getItem("token")
        if (!token) {
            navigate("/Login")
            return
        }
        api.get("/exercises/Legs")
        .then(res => setExercises(res.data))
        .catch(err => {
            console.log(err)
            if (err.response?.status === 401) {
                navigate("/Login")
            }
        })
    }, [navigate])

    const handleAddExercise = (exercise) => {
        const token = localStorage.getItem("token")
        api.post("/exercises", { ...exercise, muscleGroup: "Legs" })
        .then(res => setExercises([...exercises, res.data]))
        .catch(err => console.log(err))
    }

    const handleUpdateExercise = (index, updated) => {
        const ex = exercises[index]
        const token = localStorage.getItem("token")
        api.put(`/exercises/${ex._id}`, updated)
        .then(res => {
            const newExercises = [...exercises]
            newExercises[index] = res.data
            setExercises(newExercises)
        })
        .catch(err => console.log(err))
    }

    const handleCompleteExercise = (index, updated) => {
        const ex = exercises[index]
        api.put(`/exercises/${ex._id}`, updated)
        .then(res => {
            const newExercises = [...exercises]
            newExercises[index] = res.data
            setExercises(newExercises)
        })
        .catch(err => console.log(err))
    }

    const handleDeleteExercise = (index) => {
        const ex = exercises[index]
        const token = localStorage.getItem("token")
        api.delete(`/exercises/${ex._id}`)
        .then(() => {
            const newExercises = exercises.filter((_, i) => i !== index)
            setExercises(newExercises)
        })
        .catch(err => console.log(err))
    }

    const [showAddForm, setShowAddForm] = useState(false)

    return (

        <div>
            <div className="backBtn">
                <button onClick={() => navigate(-1)}>Back</button>
            </div>
            <h1 className="header">Legs</h1>
            <p> Select or add exercises for your legs workout</p>

            <div className="date">
                <DatePicker selected={selectedDate} onChange={handleDateChange} />
            </div>

            <div className="addBtn">
                {!showAddForm && (
                    <button onClick={() => setShowAddForm(true)}>+ Add Exercise</button>
                )}
                {showAddForm && (
                    <AddExercise
                        onAdd={handleAddExercise}
                        onCancel={() => setShowAddForm(false)}
                    />
                )}
            </div>
                <h2>Exercises for {formattedDate}</h2>

            <div className="container">
                {exercises.map((ex, index) => (
                    <ExerciseCard
                        key={index}
                        exercise={ex}
                        index={index}
                        onUpdate={handleUpdateExercise}                        
                        onComplete={handleCompleteExercise}                        
                        onDelete={handleDeleteExercise}
                    />
                ))}
            </div>

        </div>
    )
}
