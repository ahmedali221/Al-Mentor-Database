const mongoose = require("mongoose");

const lessonSchema = new mongoose.Schema(
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
    module: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Module",
      required: true,
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: false,
    },
    description: {
      en: {
        type: String,
        trim: true,
        maxlength: 500,
      },
      ar: {
        type: String,
        trim: true,
        maxlength: 500,
      },
    },
    order: {
      type: Number,
      required: true,
    },
    duration: {
      type: Number,
      default: 0,
      min: 0,
    },
    content: {
      videoUrl: String,
      articleText: {
        en: String,
        ar: String,
      },
      attachments: [
        {
          name: {
            en: String,
            ar: String,
          },
          url: String,
          type: { type: String, enum: ["pdf", "slide", "audio"] },
        },
      ],
    },
    isFree: {
      type: Boolean,
      default: false,
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

lessonSchema.index({ module: 1, order: 1 });
lessonSchema.index({ isPublished: 1 });

module.exports = mongoose.model("Lesson", lessonSchema);
