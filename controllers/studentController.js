const Student = require("../models/Student");
const User = require("../models/User");

exports.getStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};

exports.addStudent = async (req, res) => {
  try {
    const { name, class: className, age, email, password } = req.body;

    // 1. Create Student document
    const student = new Student({ name, email, class: className, age });
    await student.save();

    const userPassword = password || "student123";

    // 2. Create User document for login
    const user = new User({
      name,
      email,
      password: userPassword,
      role: "student",
      studentId: student._id
    });
    await user.save();

    res.status(201).json({ student, user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};

exports.updateStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(student);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};

exports.deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);

    // Also delete corresponding user
    await User.findOneAndDelete({ studentId: student._id });

    res.json({ msg: "Student deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};