const UserSubscription = require("../../models/Subscriptions & Payment/userSubscription");
const Subscription = require("../../models/Subscriptions & Payment/subscription");

exports.subscribeUser = async (req, res) => {
  try {
    const { userId, subscriptionId } = req.body;

    const subscription = await Subscription.findById(subscriptionId);
    if (!subscription) {
      return res.status(404).json({ message: "Subscription not found" });
    }

    const durationInDays =
      subscription.duration.unit === "months"
        ? subscription.duration.value * 30
        : subscription.duration.value;

    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(startDate.getDate() + durationInDays);

    const userSub = await UserSubscription.create({
      user: userId,
      subscription: subscriptionId,
      startDate,
      endDate,
      status: "active",
    });

    res.status(201).json(userSub);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getUserSubscriptions = async (req, res) => {
  try {
    const { userId } = req.params;
    const subs = await UserSubscription.find({ user: userId }).populate(
      "subscription"
    );
    res.status(200).json(subs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.cancelSubscription = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await UserSubscription.findByIdAndUpdate(
      id,
      { status: "canceled" },
      { new: true }
    );
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteUserSubscription = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedSub = await UserSubscription.findByIdAndDelete(id);
    if (!deletedSub) {
      return res
        .status(404)
        .json({ message: "The specified user subscription does not exist" });
    }
    res.status(200).json({ message: "User subscription deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
