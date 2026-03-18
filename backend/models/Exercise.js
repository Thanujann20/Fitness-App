import mongoose from "mongoose";

const exerciseSchema = new mongoose.Schema({
    userId : { type: String, required: true },
    name: { type: String, required: true },
    weight: { type: String, required: true },
    sets: { type: Number, required: true },
    reps: { type: String, required: true },
    muscleGroup: { type: String, required: true },
    completed: { type: Boolean, default: false },
    date: {type: Date, required: true}
});

export default mongoose.model("Exercise", exerciseSchema);