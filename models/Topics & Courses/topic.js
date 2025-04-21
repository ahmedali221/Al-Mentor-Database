const mongoose = require("mongoose");

const topicSchema = new mongoose.Schema(
  {
    name: {
      en: {
        type: String,
        required: [true, "Topic name is required"],
        unique: true,
        trim: true,
        maxlength: 100,
      },
      ar: {
        type: String,
        required: [true, "Topic name is required"],
        unique: true,
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
      }
    },
    thumbnailImgUrl: {
      type: String,
      required: true,
    },

    availableLanguages: [
      {
        type: String,
        enum: ["ar", "en", "fr"],
        required: true,
      },
    ],
    order: {
      type: Number,
      default: 0,
    },

    courseCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

topicSchema.index({ slug: 1 });
topicSchema.index({ order: 1 });

module.exports = mongoose.model("Topic", topicSchema);
