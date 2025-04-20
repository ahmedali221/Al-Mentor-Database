const Payment = require("../../models/Subscriptions & Payment/Payment");
const User = require("../../models/Users/user");
const Subscription = require("../../models/Subscriptions & Payment/subscription");

exports.createPayment = async (req, res) => {
  try {
    const { userId, subscriptionName, amount, transactionId } = req.body;

    if (!userId || !subscriptionName || !amount || !transactionId) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const subscription = await Subscription.findOne({ name: subscriptionName });
    if (!subscription) {
      return res.status(404).json({ message: "Subscription not found" });
    }

    const payment = await Payment.create({
      userId,
      subscriptionId: subscription._id,
      amount,
      transactionId,
      status: "completed",
    });

    res.status(201).json({
      message: "Payment created successfully",
      payment,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getPaymentsByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const payments = await Payment.find({ userId }).populate("subscriptionId");
    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
