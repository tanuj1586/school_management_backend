const Student = require("../models/Student");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

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

      // 🔐 Hash password
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



exports.changePassword = async (req, res) => {
  try {
    const userId = req.user.id; // from JWT middleware

   
    const { oldPassword, newPassword } = req.body;

    const user = await User.findById(userId);

    console.log(oldPassword,'old password')
    console.log(user,'user')

    if (!user) return res.status(404).json({ message: "User not found" });

    // compare old password
    const isMatch = await bcrypt.compare(oldPassword, user.password);

    console.log(isMatch,'ismatch')
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect old password" });
    }

    // hash new password
  
    user.password = newPassword;

    await user.save();

    res.json({ message: "Password updated" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};