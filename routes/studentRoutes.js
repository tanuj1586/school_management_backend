const express = require("express");
const router = express.Router();
const { getStudents, addStudent, updateStudent, deleteStudent,changePassword } = require("../controllers/studentController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

// All routes require login
router.use(protect);

// GET: everyone can view (admin sees all, student sees only their record)
router.get("/", getStudents);
router.put("/update-password",changePassword)
// POST, PUT, DELETE: admin only
router.post("/", adminOnly, addStudent);
router.put("/:id", adminOnly, updateStudent);
router.delete("/:id", adminOnly, deleteStudent);

module.exports = router;