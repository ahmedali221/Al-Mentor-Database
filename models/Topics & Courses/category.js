const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Category name is required"],
      unique: true,
      trim: true,
      maxlength: 100,
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
      maxlength: 500,
    },
    thumbnailImgUrl: {
      type: String,
      required: true,
    },
    topics: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Topic", // Reference to the Topic model
      },
    ],
    subTopics: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SubTopic", // Reference to the SubTopic model
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
