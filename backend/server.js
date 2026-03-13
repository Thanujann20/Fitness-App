import dotenv from "dotenv";
dotenv.config({ path: './.env' });

console.log("JWT_SECRET loaded in server.js:", process.env.JWT_SECRET ? "YES" : "NO");

import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import mealRoutes from "./routes/meals.js";
import userRoutes from "./routes/users.js";
import exerciseRoutes from "./routes/exercise.js";
import auth from "./routes/auth.js";


const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/api/meals", mealRoutes);
app.use("/api/exercises", exerciseRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", auth)

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected!"))
  .catch(err => console.log(err));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));