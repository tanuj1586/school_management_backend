const express = require("express");
const router = express.Router();
const { getTasks, addTask, updateTask, deleteTask } = require("../controllers/taskController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

// All routes require login
router.use(protect);

// GET: 
// Admin sees all tasks, student sees only their tasks (filter inside controller)
router.get("/", getTasks);

// POST, PUT, DELETE: admin only
router.post("/", adminOnly, addTask);
router.put("/:id", adminOnly, updateTask);
router.delete("/:id", adminOnly, deleteTask);

module.exports = router;