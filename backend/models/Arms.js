import mongoose from "mongoose";

const armsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  exercises: [{ type: String }]
});

export default mongoose.model("Arms", armsSchema);