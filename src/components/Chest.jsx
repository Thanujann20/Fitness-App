import { useState } from "react"
import "../styles/muscle.css"
import AddExercise from "./addExercise"
import ExerciseCard from "./ExerciseCard"

export default function Chest() {

    const [exercises, setExercises] = useState([
        {name: "Bench Press", weight: "100", sets: "4", reps: "8"},
        {name: "Dips", weight: "25", sets: "3", reps: "8"},
        {name: "Pec Fly", weight: "80", sets: "4", reps: "12"}
    ])

    const handleAddExercise = (exercise) => {
        setExercises([...exercises, exercise])
    }

    const [showAddForm, setShowAddForm] = useState(false);

    

    return (
        <div>
            <h1 className="header">Chest</h1>
            <p> Select or add exercises for your chest workout</p>

            <div className="addBtn">
                <button onClick={() => setShowAddForm(!showAddForm)}>
                    {showAddForm ? "Cancel" : "Add Exercise"}
                </button>
                {showAddForm && <AddExercise onAdd={handleAddExercise} />}
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