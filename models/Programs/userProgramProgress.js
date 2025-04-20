const mongoose = require("mongoose");

const userProgramProgressSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    program: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Program",
      required: true,
    },
    completedCourses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
      },
    ],
    progress: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    status: {
      type: String,
      enum: ["not_started", "in_progress", "completed"],
      default: "not_started",
    },
    startDate: {
      type: Date,
      default: Date.now,
    },
    completionDate: Date,
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

userProgramProgressSchema.index({ user: 1, program: 1 }, { unique: true });
userProgramProgressSchema.index({ status: 1 });

userProgramProgressSchema.virtual("totalCourses").get(async function () {
  return await mongoose
    .model("ProgramCourse")
    .countDocuments({ program: this.program });
});

module.exports = mongoose.model(
  "UserProgramProgress",
  userProgramProgressSchema
);
