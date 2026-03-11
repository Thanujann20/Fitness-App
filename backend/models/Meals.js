import mongoose from "mongoose";

const mealSchema = new mongoose.Schema({
  userId : { type: String, required: true },
  description: { type: String, required: true },
  calories: { type: Number, required: true },
  protein: { type: Number, required: true },
  carbs: { type: Number, required: true },
  fat: { type: Number, required: true }
});

export default mongoose.model("Meals", mealSchema);