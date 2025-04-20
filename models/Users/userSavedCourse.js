const mongoose = require("mongoose");

const userSavedCourseSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  savedAt: {
    type: Date,
    default: Date.now,
  },
});

// Compound index to prevent duplicate saves
userSavedCourseSchema.index({ userId: 1, courseId: 1 }, { unique: true });

module.exports = mongoose.model("UserSavedCourse", userSavedCourseSchema);
