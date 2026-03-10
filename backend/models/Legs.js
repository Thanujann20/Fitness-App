import mongoose from "mongoose";

const legsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  exercises: [{ type: String }]
});

export default mongoose.model("Legs", legsSchema);