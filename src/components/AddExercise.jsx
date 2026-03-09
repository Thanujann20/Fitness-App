import { useState } from "react"
import "../styles/addExercise.css"

export default function AddExercise({ onAdd, onCancel }) {
    
    const [formData, setFormData] = useState({
            name: "",
            weight: "",
            sets: "",
            reps: ""
        });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSave = () => {
        const weight = formData.weight.trim();
        const sets = formData.sets.trim();
        const reps = formData.reps.trim();

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

        onAdd(formData);
        onCancel();
    };

    return (
        <div className="edit">
            <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Exercise Name"
            />
            <input
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                placeholder="Weight (e.g. 100)"
            />
            <input
                name="sets"
                value={formData.sets}
                onChange={handleChange}
                placeholder="Sets"
            />
            <input
                name="reps"
                value={formData.reps}
                onChange={handleChange}
                placeholder="Reps (e.g. 10 or 60 sec)"
            />
            <div className="buttonRow">
                <button onClick={handleSave}>Save</button>
                <button onClick={onCancel}>Cancel</button>
            </div>
            
        </div>
    )
}
       