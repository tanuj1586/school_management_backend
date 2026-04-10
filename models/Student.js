const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true,trim: true },
  email: { type: String, required: true, unique: true, lowercase: true,trim: true},
  class: { type: String, required: true,trim: true },
  age: { type: Number },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Student", studentSchema);