import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./db.js"; 
import authRoutes from "./routes/auth.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);


connectDB()
  .then(() => {
    console.log("Database connected");
    app.listen(5000, () => {
      console.log("Server running on http://localhost:5000");
    });
  })
  .catch((err) => {
    console.error("DB connection failed:", err.message);
  });
