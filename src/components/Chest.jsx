import { useState } from "react"
import "../styles/chest.css"
import AddExercise from "./addExercise"
import Card from "./Card"

export default function Chest() {

    const [exercises, setExercises] = useState([
        {name: "Bench Press", weight: "100 lbs", sets: "4", reps: "8"},
        {name: "Dips", weight: "25 lbs", sets: "3", reps: "8"},
        {name: "Pec Fly", weight: "80 lbs", sets: "4", reps: "12"}
    ])

    const handleAddExercise = (exercise) => {
        setExercises([...exercises, exercise])
    }

    return (
        <div>
            <h1 className="header">Chest</h1>
            <p> Select or add exercises for your chest workout</p>
            <div className="container">
                {exercises.map((ex, index) => (
                    <Card
                        key = {index}
                        title={ex.name}
                        description={`Weight: ${ex.weight}, Sets: ${ex.sets}, Reps: ${ex.reps}`}
                    />
                ))}

            </div>
            <AddExercise onAdd={handleAddExercise}/>
        </div>
    )
}