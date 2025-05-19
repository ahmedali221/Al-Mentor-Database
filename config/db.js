const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // await mongoose.connect(
    //   process.env.MONGODB_URI || "mongodb+srv://saraa8758:hBohIDQwkVX5E2xQ@cluster0.zsqpgis.mongodb.net/almentor"
    // );
    await mongoose.connect(
      process.env.MONGODB_URI ||
        "mongodb+srv://ahmeedali332332:yYVxwSR7bKOQAAFV@cluster0.oub3q5a.mongodb.net/Al-Mentor-Database"
    );
    console.log("MongoDB Connected...");
  } catch (err) {
    console.error("Database connection error:", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
