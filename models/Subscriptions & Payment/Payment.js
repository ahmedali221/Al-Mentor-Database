const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    subscription: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subscription",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    currency: {
      type: String,
      default: "USD",
      enum: ["USD", "EGP"],
    },
    transactionId: {
      type: String,
      unique: true,
      required: true,
    },
    status: {
      en: {
        type: String,
        enum: ["pending", "completed", "failed"],
        default: "pending",
        required: true,
      },
      ar: {
        type: String,
        enum: ["قيد الانتظار", "مكتمل", "فشل"], // Arabic equivalents
        default: "قيد الانتظار",
        required: true,
      }
    },
    paymentMethod: {
      type: String,
      enum: ["credit_card", "paypal", "bank_transfer"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster queries
paymentSchema.index({ user: 1 });
paymentSchema.index({ status: 1 });

module.exports = mongoose.model("Payment", paymentSchema);
