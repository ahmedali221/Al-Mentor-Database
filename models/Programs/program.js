const mongoose = require("mongoose");

const programSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Program title is required"],
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    level: {
      type: String,
      enum: ["beginner", "intermediate", "advanced"],
      required: true,
    },
    language: {
      type: String,
      default: "ar",
    },

    totalDuration: {
      type: Number,
      default: 0,
    },
    instructors: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Instructor",
      },
    ],
    learningOutcomes: [String],
    category: {
      type: String,
      enum: ["language", "business", "development"],
      index: true,
    },
  },
  { timestamps: true }
);
programSchema.virtual("instructorDetails", {
  ref: "Instructor",
  localField: "instructors",
  foreignField: "_id",
  justOne: true,
  options: { select: "user expertiseAreas", populate: { path: "profile" } },
});
module.exports = mongoose.model("Program", programSchema);
