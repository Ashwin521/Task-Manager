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
import cors from "cors";
import serverless from "serverless-http";

dotenv.config();
connectDB();

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ msg: "Server Error" });
});

// ✅ Export serverless function instead of app.listen
export default serverless(app);
