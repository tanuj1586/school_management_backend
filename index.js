const express = require("express");

const cors = require("cors");
const connectDB = require("./config/db");
require("dotenv").config(); // Load env variables


const authRoutes = require("./routes/authRoutes");
const studentRoutes = require("./routes/studentRoutes");
const taskRoutes = require("./routes/taskRoutes");

const app = express();
connectDB();

app.use(cors());
app.use(express.json());


app.use("/api/auth", authRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/tasks", taskRoutes);

app.listen(5000, () => console.log("Server running test"));