// import express from "express";
// import dotenv from "dotenv";
// import connectDB from "./config/db.js";
// import authRoutes from "./routes/authRoutes.js";
// import taskRoutes from "./routes/taskRoutes.js";
// import cors from "cors";

// dotenv.config();
// connectDB();

// const app = express();
// app.use(cors({origin:`*`}))
// app.use(express.json());

// app.use("/api/auth", authRoutes);
// app.use("/api/tasks", taskRoutes);


// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({ msg: "Server Error" });
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// export {app}

import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import serverless from "serverless-http";

dotenv.config();
connectDB();

const app = express();
<<<<<<< HEAD
=======

const allowedOrigins = [
  "http://localhost:5173",
  "https://task-manager-frontend-mu-five.vercel.app"
];

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
  }
  if (req.method === "OPTIONS") return res.sendStatus(200);
  next();
});

>>>>>>> deploy
app.use(express.json());

// Function to handle CORS for each request
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "https://task-manager-frontend-mu-five.vercel.app"); // frontend URL
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");

  // If OPTIONS request, respond immediately
  if (req.method === "OPTIONS") return res.status(200).end();

  next();
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ msg: "Server Error" });
});

<<<<<<< HEAD
// Export as serverless function
=======
>>>>>>> deploy
export default serverless(app);
