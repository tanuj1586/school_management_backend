const express = require("express");
const router = express.Router();
const { getStudents, addStudent, updateStudent, deleteStudent } = require("../controllers/studentController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

// All routes require login
router.use(protect);

// GET: everyone can view (admin sees all, student sees only their record)
router.get("/", getStudents);

// POST, PUT, DELETE: admin only
router.post("/", adminOnly, addStudent);
router.put("/:id", adminOnly, updateStudent);
router.delete("/:id", adminOnly, deleteStudent);

module.exports = router;