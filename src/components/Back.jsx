import { useState } from "react"
import "../styles/muscle.css"
import AddExercise from "./addExercise"
import ExerciseCard from "./ExerciseCard"

export default function Back() {

    const [exercises, setExercises] = useState([
        { name: "Pull-Ups", weight: "Bodyweight", sets: "3", reps: "8" },
        { name: "Lat Pulldown", weight: "100", sets: "4", reps: "10" },
        { name: "Barbell Rows", weight: "80", sets: "3", reps: "12" }
    ]);

    const handleAddExercise = (exercise) => {
        setExercises([...exercises, exercise])
    }

    

    return (
        <div>
            <h1 className="header">Back</h1>
            <p> Select or add exercises for your back workout</p>
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