import mongoose from "mongoose";

const backSchema = new mongoose.Schema({
  name: { type: String, required: true },
  exercises: [{ type: String }]
});

export default mongoose.model("Back", backSchema);