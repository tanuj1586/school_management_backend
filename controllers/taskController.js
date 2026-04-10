const Task = require("../models/Task");

exports.getTasks = async (req, res) => {
  try {
    const role = req.headers.role;

    
    const studentId = req.headers.studentid;

    console.log(studentId,'studentId')

    let tasks = []; // ✅ ALWAYS ARRAY

    if (role === "admin") {
      tasks = await Task.find().populate("studentId", "name class");
    }

    else if (role === "student") {
      if (!studentId) {
        return res.json([]); // ✅ safe fallback
      }

      tasks = await Task.find({ studentId }).populate("studentId", "name class");
    }

    else {
      return res.json([]); // ❗ NEVER send error object
    }

    res.json(tasks);
  } catch (err) {
    res.json([]); // ❗ ALWAYS RETURN ARRAY EVEN ON ERROR
  }
};

exports.addTask = async (req, res) => {
  const task = new Task(req.body);
  await task.save();
  res.json(task);
};

exports.updateTask = async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(task);
};

exports.deleteTask = async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ msg: "Task deleted" });
};