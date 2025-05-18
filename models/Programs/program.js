const mongoose = require("mongoose");

const programSchema = new mongoose.Schema(
  {
    title: {
      en: {
        type: String,
        required: [true, "Program title (English) is required"],
        trim: true,
      },
      ar: {
        type: String,
        required: [true, "Program title (Arabic) is required"],
        trim: true,
      },
    },
    slug: {
      en: {
        type: String,
        unique: true,
        lowercase: true,
        required: true,
      },
      ar: {
        type: String,
        unique: true,
        lowercase: true,
        required: true,
      },
    },
    description: {
      en: {
        type: String,
        required: [true, "Program description (English) is required"],
      },
      ar: {
        type: String,
        required: [true, "Program description (Arabic) is required"],
      },
    },
    thumbnail: {
      type: String,
      required: true,
    },
    level: {
      en: {
        type: String,
        enum: ["beginner", "intermediate", "advanced"],
        required: true,
      },
      ar: {
        type: String,
        enum: ["مبتدئ", "متوسط", "متقدم"],
        required: true,
      },
    },
    language: {
      type: String,
      enum: ["ar", "en"],
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
        default: [],
      },
    ],
    learningOutcomes: [
      {
        default: [],

        en: { type: String, required: true },
        ar: { type: String, required: true },
      },
    ],
    category: {
      en: {
        type: String,
        enum: ["language", "business", "development"],
        required: true,
      },
      ar: {
        type: String,
        enum: ["لغة", "أعمال", "تطوير"],
        required: true,
      },
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual to populate full course details
programSchema.virtual("courseDetails", {
  ref: "Course",
  localField: "courses",
  foreignField: "_id",
  justOne: false,
});

module.exports = mongoose.model("Program", programSchema);
