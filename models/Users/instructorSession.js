const mongoose = require("mongoose");

const instructorSessionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Instructor",
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 1000,
    },
    requestedDate: {
      type: Date,
      required: true,
    },
    requestedDuration: {
      type: Number, // Duration in minutes
      required: true,
      min: 15,
      max: 120,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected", "completed", "cancelled"],
      default: "pending",
    },
    chat: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chat",
    },
    approvalDate: {
      type: Date,
    },
    rejectionReason: {
      type: String,
      trim: true,
      maxlength: 500,
    },
    meetingLink: {
      type: String,
      trim: true,
    },
    notes: {
      type: String,
      trim: true,
      maxlength: 1000,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for faster queries
instructorSessionSchema.index({ user: 1, status: 1 });
instructorSessionSchema.index({ instructor: 1, status: 1 });
instructorSessionSchema.index({ requestedDate: 1 });

module.exports = mongoose.model("InstructorSession", instructorSessionSchema);
