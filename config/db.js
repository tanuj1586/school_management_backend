const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI); // no options needed
    console.log("DB Connected");
  } catch (err) {
    console.error("DB Connection Error:", err);
    process.exit(1);
  }
};

module.exports = connectDB;