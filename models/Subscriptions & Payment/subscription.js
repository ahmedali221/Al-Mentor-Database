const mongoose = require("mongoose");

const subscriptionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // Ensure name is a string and required
  },
  displayName: {
    en: { type: String, required: true }, 
    ar: { type: String, required: true }, 
  },
  description: {
    en: { type: String, required: true }, 
    ar: { type: String, required: true }, 
  },
  price: {
    amount: { type: Number, required: true }, 
    originalAmount: { type: Number },
    currency: { type: String, required: true },
  },
  duration: {
    value: { type: Number, required: true },
    unit: { type: String, required: true },
  },
  trialPeriod: {
    enabled: { type: Boolean, default: false },
    durationDays: { type: Number },
  },
  features: [
    {
      title: {
        en: { type: String, required: true },
        ar: { type: String, required: true },
      },
      description: {
        en: { type: String, required: true },
        ar: { type: String, required: true },
      },
      icon: { type: String },
    },
  ],
  isActive: { type: Boolean, default: true },
  priority: { type: Number, default: 0 },
});

module.exports = mongoose.model("Subscription", subscriptionSchema);
