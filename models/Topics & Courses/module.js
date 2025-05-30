const mongoose = require("mongoose");
const category = require("./category");

const moduleSchema = mongoose.Schema(
  {
    title: {
      en: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100,
      },
      ar: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100,
      },
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },

    order: {
      type: Number,
      required: true,
    },
    duration: {
      type: Number,
      default: 0,
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
    lessons: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Lesson",
        default: [],
      },
    ],
    completionCriteria: {
      type: String,
      enum: ["all-lessons", "quiz-pass", "none"],
      default: "all-lessons",
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
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

moduleSchema.virtual("totalLessons").get(function () {
  return this.lessons?.length || 0;
});

moduleSchema.pre("save", async function (next) {
  if (this.isModified("lessons")) {
    const lessons = await mongoose.model("Lesson").find({
      _id: { $in: this.lessons },
    });
    this.duration = lessons.reduce((sum, lesson) => sum + lesson.duration, 0);
  }
  next();
});

moduleSchema.pre("remove", async function (next) {
  await mongoose.model("Lesson").deleteMany({ module: this._id });
  next();
});

moduleSchema.index({ course: 1, order: 1 });
moduleSchema.index({ isPublished: 1 });

const Module = mongoose.model("Module", moduleSchema);
module.exports = Module;
