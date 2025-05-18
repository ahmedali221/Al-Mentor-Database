const Payment = require("../../models/Subscriptions & Payment/Payment");
const User = require("../../models/Users/user");
const Subscription = require("../../models/Subscriptions & Payment/subscription");

exports.createPayment = async (req, res) => {
  try {
    const { user, subscription, amount, transactionId, currency, paymentMethod, status } = req.body;

    if (!user || !subscription || !amount || !transactionId || !currency || !paymentMethod || !status || !status.en || !status.ar) {
      return res.status(400).json({ message: "All fields, including status in both languages, are required" });
    }

    const userDoc = await User.findById(user);
    if (!userDoc) {
      return res.status(404).json({ message: "User not found" });
    }

    const subscriptionDoc = await Subscription.findById(subscription);
    if (!subscriptionDoc) {
      return res.status(404).json({ message: "Subscription not found" });
    }

    try {
      const payment = await Payment.create({
        user,
        subscription,
        amount,
        currency,
        transactionId,
        paymentMethod,
        status,
      });

      res.status(201).json({
        message: "Payment created successfully",
        payment,
      });
    } catch (error) {
      if (error.code === 11000) {
        // Handle duplicate transactionId error
        res.status(400).json({ message: "Duplicate transaction ID" });
      } else {
        res.status(500).json({ message: error.message });
      }
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all payments for a specific user
exports.getPaymentsByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const payments = await Payment.find({ user: userId })
      .populate("subscription")
      .populate("user");
    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all payments
exports.getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find()
      .populate("subscription")
      .populate("user");
    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

