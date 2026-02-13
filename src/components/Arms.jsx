import { useState } from "react"
import "../styles/muscle.css"
import AddExercise from "./addExercise"
import ExerciseCard from "./ExerciseCard"

export default function Arms() {

    const [exercises, setExercises] = useState([
        { name: "Bicep Curls", weight: "25", sets: "3", reps: "12" },
        { name: "Tricep Pushdowns", weight: "40", sets: "4", reps: "10" },
        { name: "Hammer Curls", weight: "20", sets: "3", reps: "15" }
    ]);

    const handleAddExercise = (exercise) => {
        setExercises([...exercises, exercise])
    }

    return (
        <div>
            <h1 className="header">Arms and Shoulders</h1>
            <p> Select or add exercises for your arms and shoulders</p>
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