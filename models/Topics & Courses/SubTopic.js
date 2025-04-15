const subtopicSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "SubTopic name is required"],
      trim: true,
      maxlength: 100,
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
      type: String,
      maxlength: 300,
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
subtopicSchema.index({ slug: 1 });

module.exports = mongoose.model("SubTopic", subtopicSchema);
