const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      en: {
        type: String,
        required: [true, "Category name (English) is required"],
        unique: true,
        trim: true,
        maxlength: 100,
      },
      ar: {
        type: String,
        required: [true, "Category name (Arabic) is required"],
        unique: true,
        trim: true,
        maxlength: 100,
      },
    },
    description: {
      en: {
        type: String,
        required: true,
        maxlength: 500,
      },
      ar: {
        type: String,
        required: true,
        maxlength: 500,
      },
    },
    thumbnailImgUrl: {
      type: String,
      required: true,
    },
    topics: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Topic",
        default: [],
      },
    ],
    subTopics: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SubTopic",
        default: [],
      },
    ],
    courses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        default: [],
      },
    ],
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

categorySchema.index({ order: 1 });

module.exports = mongoose.model("Category", categorySchema);
