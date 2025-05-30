const mongoose = require("mongoose");

const instructorSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
      immutable: true,
    },
    professionalTitle: {
      en: {
        type: String,
        required: true,
        maxlength: 100,
      },
      ar: {
        type: String,
        required: true,
        maxlength: 100,
      },
    },
    expertiseAreas: {
      en: {
        type: [String],
        required: true,
        validate: {
          validator: (v) => v.length > 0 && v.length <= 10,
          message: "Provide 1-10 expertise areas",
        },
      },
      ar: {
        type: [String],
        required: true,
        validate: {
          validator: (v) => v.length > 0 && v.length <= 10,
          message: "يجب توفير من 1 إلى 10 مجالات خبرة",
        },
      },
    },
    biography: {
      en: {
        type: String,
        required: true,
        minlength: 50,
        maxlength: 2000,
      },
      ar: {
        type: String,
        required: true,
        minlength: 50,
        maxlength: 2000,
      },
    },
    socialMediaLinks: {
      type: Map,
      of: String,
      validate: {
        validator: (links) => {
          const allowed = ["linkedin", "twitter", "youtube", "website"];
          return [...links.keys()].every((platform) =>
            allowed.includes(platform)
          );
        },
        message: "Only LinkedIn/Twitter/YouTube/Website links allowed",
      },
    },
    yearsOfExperience: {
      type: Number,
      min: 0,
      max: 60,
    },
    approvalStatus: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

instructorSchema.index({ expertiseAreas: 1 });
instructorSchema.index({ approvalStatus: 1 });

instructorSchema.virtual("profile", {
  ref: "User",
  localField: "user",
  foreignField: "_id",
  justOne: true,
  options: { select: "firstName lastName email profilePicture" },
});

module.exports = mongoose.model("Instructor", instructorSchema);
