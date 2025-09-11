import express from "express";
import dotenv from "dotenv";
import connectDB from "../../config/db.js";
import authRoutes from "../../routes/authRoutes.js";
import taskRoutes from "../../routes/taskRoutes.js";
import serverless from "serverless-http";

dotenv.config();
connectDB();

<<<<<<< HEAD
export default app;

=======
const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://task-manager-frontend-mu-five.vercel.app");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type,Authorization");
  if (req.method === "OPTIONS") return res.sendStatus(200);
  next();
});

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ msg: "Server Error" });
});

export default serverless(app);
>>>>>>> deploy
