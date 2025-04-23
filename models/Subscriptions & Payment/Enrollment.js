const mongoose = require("mongoose");

const enrollmentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
      index: true,
    },
    subscription: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subscription",
      required: function () {
        return !this.isFree;
      },
    },
    enrollmentDate: {
      type: Date,
      default: Date.now,
    },
    status: {
      en: {
        type: String,
        enum: ["active", "completed", "cancelled"],
        default: "active",
        required: true,
      },
      ar: {
        type: String,
        enum: ["نشط", "مكتمل", "ملغي"], // Arabic equivalents
        default: "نشط",
        required: true,
      }
    },
    isFree: {
      type: Boolean,
      default: false,
    },
    lastAccessed: Date,
    progress: {
      completedLessons: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Lesson",
        },
      ],
      percentage: {
        type: Number,
        default: 0,
        min: 0,
        max: 100,
      },
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

enrollmentSchema.virtual("hasAccess").get(function () {
  if (this.isFree) return true;

  return this.populated("subscription")
    ? this.subscription.status === "active" &&
        new Date() <= this.subscription.endDate
    : false;
});

enrollmentSchema.index({ user: 1, status: 1 });
enrollmentSchema.index({ course: 1, isFree: 1 });

module.exports = mongoose.model("Enrollment", enrollmentSchema);
