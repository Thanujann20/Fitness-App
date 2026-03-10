import mongoose from "mongoose";

const chestSchema = new mongoose.Schema({
  name: { type: String, required: true },
  exercises: [{ type: String }]
});

export default mongoose.model("Chest", chestSchema);