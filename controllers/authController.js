const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");


exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if user exists
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: "User already exists" });

    // Create new user
    user = new User({ name, email, password, role });
    await user.save();

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role }, // payload
      process.env.JWT_SECRET,            // secret key
      { expiresIn: "1m" }               // expiration
    );

    // Return user info + token
    res.status(201).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};
exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  console.log(user,'user')
  if(!user) return res.status(400).json({ msg: "User not found" });
 const isMatch = await bcrypt.compare(password, user.password);
  if(!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
  const role = user?.role;
     const studentId = role === "student" ? user.studentId : null;

     console.log(studentId,'student id')
  res.json({ token ,role ,studentId});
};