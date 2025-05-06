const mongoose = require("mongoose");

const subtopicSchema = new mongoose.Schema(
  {
    name: {
      en: {
        type: String,
        required: [true, "SubTopic name (English) is required"],
        trim: true,
        maxlength: 100,
      },
      ar: {
        type: String,
        required: [true, "SubTopic name (Arabic) is required"],
        trim: true,
        maxlength: 100,
      }
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      required: true,
    },
    topic: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Topic",
      required: true,
    },
    description: {
      en: {
        type: String,
        maxlength: 300,
      },
      ar: {
        type: String,
        maxlength: 300,
      }
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    thumbnailImgUrl: String,

    order: {
      type: Number,
      required: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

subtopicSchema.index({ topic: 1, order: 1 });

module.exports = mongoose.model("SubTopic", subtopicSchema);
