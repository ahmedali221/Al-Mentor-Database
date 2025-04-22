const mongoose = require("mongoose");

const userSubscriptionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    subscription: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subscription",
      required: true,
      validate: {
        validator: async function (v) {
          const Subscription = mongoose.model("Subscription");
          const exists = await Subscription.exists({ _id: v });
          return !!exists;
        },
        message: "Subscription not found",
      },
    },
    startDate: {
      type: Date,
      default: Date.now,
    },
    endDate: {
      type: Date,
      required: true,
      validate: {
        validator: function (v) {
          return v > this.startDate;
        },
        message: "End date must be after start date",
      },
    },
    status: {
      type: String,
      enum: ["active", "expired", "canceled"],
      default: "active",
    },

    notifications: {
      renewalWarning: {
        sent: Boolean,
        sentAt: Date,
      },
      expiredNotice: {
        sent: Boolean,
        sentAt: Date,
      },
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

userSubscriptionSchema.virtual("isValid").get(function () {
  return this.status === "active" && new Date() <= this.endDate;
});

userSubscriptionSchema.index({ endDate: 1 });
userSubscriptionSchema.index({ user: 1, status: 1 });

userSubscriptionSchema.pre("save", function (next) {
  if (this.isModified("endDate") && new Date() > this.endDate) {
    this.status = "expired";
  }
  next();
});

module.exports = mongoose.model("UserSubscription", userSubscriptionSchema);
