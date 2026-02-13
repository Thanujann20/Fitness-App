import { useState } from "react"
import "../styles/muscle.css"
import AddExercise from "./addExercise"
import ExerciseCard from "./ExerciseCard"

export default function Core() {

    const [exercisesCore, setExercisesCore] = useState([
        {name: "Plank", weight: "Bodyweight", sets: "3", reps: "60 sec"},
        {name: "Russian Twists", weight: "20", sets: "4", reps: "20"},
        {name: "Hanging Leg Raises", weight: "Bodyweight", sets: "3", reps: "15"}
    ])

    const handleAddExercise = (exercise) => {
        setExercises([...exercises, exercise])
    }

    return (
        <div>
            <h1 className="header">Core</h1>
            <p> Select or add exercises for your core workout</p>
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