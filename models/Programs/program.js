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
    courses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
      },
    ],
    learningOutcomes: [String],
    category: {
      type: String,
      enum: ["language", "business", "development"],
      index: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true }, // Ensure virtuals are included in JSON output
    toObject: { virtuals: true }, // Ensure virtuals are included when converting to objects
  }
);

// Virtual to populate full course details
// This will show the data of the courses
programSchema.virtual("courseDetails", {
  ref: "Course",
  localField: "courses",
  foreignField: "_id",
  justOne: false,
});

module.exports = mongoose.model("Program", programSchema);
