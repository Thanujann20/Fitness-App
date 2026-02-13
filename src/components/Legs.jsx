import { useState } from "react"
import "../styles/muscle.css"
import AddExercise from "./addExercise"
import ExerciseCard from "./ExerciseCard"

export default function Legs() {

    const [exercises, setExercises] = useState([
        {name: "Machine Leg Raises", weight: "50", sets: "4", reps: "12"},
        {name: "Machine Leg Curls", weight: "80", sets: "3", reps: "10"},
        {name: "Barbell Squats", weight: "120", sets: "2", reps: "6"}
    ])

    const handleAddExercise = (exercise) => {
        setExercises([...exercises, exercise])
    }

    return (
        <div>
            <h1 className="header">Legs</h1>
            <p> Select or add exercises for your leg workout</p>
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
            <AddExercise onAdd={handleAddExercise}/>
        </div>
    )
}