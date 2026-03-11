import { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom";
import "../styles/muscle.css"
import AddExercise from "./addExercise"
import ExerciseCard from "./ExerciseCard"

export default function Legs() {
    const navigate = useNavigate();

    const [exercises, setExercises] = useState([])

    // Fetch exercises from backend
    useEffect(() => {
        axios.get("http://localhost:3000/api/exercises/Legs")
        .then(res => setExercises(res.data))
        .catch(err => console.log(err));
    }, []);

    const handleAddExercise = (exercise) => {
        axios.post("http://localhost:3000/api/exercises", { ...exercise, muscleGroup: "Legs", userId: "12345" })
        .then(res => setExercises([...exercises, res.data]))
        .catch(err => console.log(err));
    };

    const handleUpdateExercise = (index, updated) => {
        const ex = exercises[index];
        axios.put(`http://localhost:3000/api/exercises/${ex._id}`, updated)
        .then(res => {
            const newExercises = [...exercises];
            newExercises[index] = res.data;
            setExercises(newExercises);
        })
        .catch(err => console.log(err));
    };

    const handleDeleteExercise = (index) => {
        const ex = exercises[index];
        axios.delete(`http://localhost:3000/api/exercises/${ex._id}`)
        .then(() => {
            const newExercises = exercises.filter((_, i) => i !== index);
            setExercises(newExercises);
        })
        .catch(err => console.log(err));
    };

    const [showAddForm, setShowAddForm] = useState(false);

    return (

        <div>
            <div className="backBtn">
                <button onClick={() => navigate(-1)}>Back</button>
            </div>
            <h1 className="header">Legs</h1>
            <p> Select or add exercises for your legs workout</p>

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
            
            <div className="container">
                {exercises.map((ex, index) => (
                    <ExerciseCard
                        key={index}
                        exercise={ex}
                        index={index}
                        onUpdate={handleUpdateExercise}
                        onDelete={handleDeleteExercise}
                    />
                ))}
            </div>
            
        </div>
    )
}