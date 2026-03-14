import { useState } from "react";
import "../styles/exerciseCard.css";
import checkImg from "../assets/check.png";

export default function ExerciseCard({ exercise, index, onUpdate, onDelete, onComplete }) {

    const [editing, setEditing] = useState(false);

    const [completed, setComplete] = useState(exercise.completed || false);

    const [formData, setFormData] = useState({
        name: exercise.name,
        weight: exercise.weight,
        sets: exercise.sets,
        reps: exercise.reps
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSave = () => {
        const weight = String(formData.weight).trim();
        const sets = String(formData.sets).trim();
        const reps = String(formData.reps).trim();

        // Validate Name
        if (!formData.name.trim()) {
            alert("Name cannot be empty");
            return;
        }

        // Validate weight
        if (!weight) {
            alert("Weight cannot be empty");
            return;
        }
        if (weight.toLowerCase() !== "bodyweight" && !/^\d+$/.test(weight)) {
            alert("Weight must be a number or Bodyweight");
            return;
        }

        // Validate sets
        if (!sets || !/^\d+$/.test(sets) || parseInt(sets) <= 0) {
            alert("Sets must be a positive number");
            return;
        }

        // Validate reps
        if (!reps) {
            alert("Reps cannot be empty");
            return;
        }

        const isNumber = /^\d+$/.test(reps) && parseInt(reps) > 0;
        const isTime = /^\d+\s*(sec|secs|seconds|mins|minutes|min)?$/i.test(reps);

        if (!isNumber && !isTime) {
            alert("Reps must be a positive number or time such as '60 sec' or '1 min'");
            return;
        }

        onUpdate(index, {
            ...exercise,
            name: formData.name,
            weight,
            sets,
            reps
        });
        setEditing(false);
    };

    return (
        <div className="ECard">
            <h5>{exercise.name}</h5>

            {editing ? (
                <>  
                <div className="editing">
                    <label htmlFor="name">Name:</label>
                    <input
                        name="name"
                        placeholder="Name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                </div>
                <div className="editing">
                    <label htmlFor="weight">Weight:</label>
                    <input
                        name="weight"
                        placeholder="50, 120..."
                        value={formData.weight}
                        onChange={handleChange}
                    />
                </div>
                <div className="editing">
                    <label htmlFor="sets">Sets:</label>
                    <input
                        name="sets"
                        placeholder="2, 4, ..."
                        min="1"
                        value={formData.sets}
                        onChange={handleChange}
                    />
                </div>
                <div className="editing">
                    <label htmlFor="reps">Reps:</label>
                    <input
                        name="reps"
                        placeholder="8, 12, ..."
                        min="1"
                        value={formData.reps}
                        onChange={handleChange}
                    />
                </div>
                    <div className="buttonRow">
                        <button onClick={handleSave}>Save</button>
                        <button onClick={() => {
                            setEditing(false);
                            setFormData({
                                name: exercise.name,
                                weight: exercise.weight,
                                sets: exercise.sets,
                                reps: exercise.reps
                            });
                        }}>Cancel</button>
                    </div>
                </>
            ) : (
                <>
                    <p>Weight (lbs): {exercise.weight}</p>
                    <p>Sets: {exercise.sets}</p>
                    <p>Reps: {exercise.reps}</p>

                    <div className="buttonRow">
                        <button onClick={() => setEditing(true)}>Edit</button>
                        <button onClick={() => {
                            setComplete(true);
                            onComplete(index, { ...exercise, completed: true });
                        }}>Complete</button>
                        <button onClick={() => onDelete(index)}>Delete</button>
                    </div>

                </>
                
            )}
            {completed && (
                <div className="completed">
                <img src={checkImg} alt="Completed!" />
                </div>
            )}
        </div>
    );
}