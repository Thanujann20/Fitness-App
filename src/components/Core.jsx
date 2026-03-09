import { useState } from "react"
import { useNavigate } from "react-router-dom";
import "../styles/muscle.css"
import AddExercise from "./addExercise"
import ExerciseCard from "./ExerciseCard"

export default function Core() {
    const navigate = useNavigate();

    const [exercises, setExercises] = useState([
        {name: "Plank", weight: "Bodyweight", sets: "3", reps: "60 sec"},
        {name: "Russian Twists", weight: "20", sets: "4", reps: "20"},
        {name: "Hanging Leg Raises", weight: "Bodyweight", sets: "3", reps: "15"}
    ])

    const handleAddExercise = (exercise) => {
        setExercises([...exercises, exercise])
    }

    const [showAddForm, setShowAddForm] = useState(false);

    return (

        <div>
            <div className="backBtn">
                <button onClick={() => navigate(-1)}>Back</button>
            </div>
            <h1 className="header">Core</h1>
            <p> Select or add exercises for your core workout</p>

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
                        onUpdate={(i, updated) => {
                            const newExercises = [...exercises];
                            newExercises[i] = updated;
                            setExercises(newExercises);
                        }}
                    />
                ))}
            </div>
            
        </div>
    )
}