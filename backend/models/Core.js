import mongoose from "mongoose";

const coreSchema = new mongoose.Schema({
  name: { type: String, required: true },
  exercises: [{ type: String }]
});

export default mongoose.model("Core", coreSchema);