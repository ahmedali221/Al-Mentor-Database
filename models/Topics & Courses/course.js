const mongoose = require("mongoose");
const category = require("./category");
const courseSchema = new mongoose.Schema(
  {
    // Core Fields
    title: {
      en: {
        type: String,
        required: true,
        trim: true,
        maxlength: 120,
      },
      ar: {
        type: String,
        required: true,
        trim: true,
        maxlength: 120,
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
    topic: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Topic",
      required: true,
    },
    subtopic: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubTopic",
    },
    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Instructor",
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    thumbnail: {
      type: String,
      required: true,
      validate: {
        validator: (v) => {   
          return (
            v.startsWith("http://") ||
            v.startsWith("https://") ||
            v.startsWith("data:image/")
          );
        },
        message: (props) => `${props.value} is not a valid URL!`,
      },
    },
    // Content
    description: {
      en: {
        type: String,
        required: true,
        maxlength: 2000,
      },
      ar: {
        type: String,
        required: true,
        maxlength: 2000,
      },
    },
    shortDescription: {
      en: {
        type: String,
        maxlength: 200,
      },
      ar: {
        type: String,
        maxlength: 200,
      },
    },
    modules: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Module",
        default: [],
      },
    ],
    freeLessons: [
      {
        lessonId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Lesson",
          default: [],
        },
        title: String,
        duration: Number,
      },
    ],

    // Filtering/Sorting
    level: {
      en: {
        type: String,
        enum: ["beginner", "intermediate", "advanced"],
        default: "beginner",
        required: true,
      },
      ar: {
        type: String,
        enum: ["مبتدئ", "متوسط", "متقدم"],
        default: "مبتدئ",
        required: true,
      },
    },
    language: {
      en: {
        type: String,
        enum: ["English", "Arabic", "French"],
        default: "Arabic",
        required: true,
      },
      ar: {
        type: String,
        enum: ["الإنجليزية", "العربية", "الفرنسية"],
        default: "العربية",
        required: true,
      },
    },
    duration: {
      type: Number,
      default: 0,
    },
    lastUpdated: {
      type: Date,
      default: Date.now,
    },

    // Stats
    enrollmentCount: {
      type: Number,
      default: 0,
    },
    isFree: {
      type: Boolean,
      default: false,
    },
    rating: {
      average: {
        type: Number,
        min: 0,
        max: 5,
        default: 0,
      },
      count: {
        type: Number,
        default: 0,
      },
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Indexes
courseSchema.index({ topic: 1 });
courseSchema.index({ subtopic: 1 });
courseSchema.index({ language: 1 });
courseSchema.index({ level: 1 });
courseSchema.index({ lastUpdated: -1 });
courseSchema.index({ enrollmentCount: -1 });

// Virtual for instructor details
courseSchema.virtual("instructorDetails", {
  ref: "Instructor",
  localField: "instructor",
  foreignField: "_id",
  justOne: true,
  options: { select: "user expertiseAreas", populate: { path: "profile" } },
});

module.exports = mongoose.model("Course", courseSchema);
