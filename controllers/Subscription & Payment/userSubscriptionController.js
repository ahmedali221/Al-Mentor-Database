const UserSubscription = require("../../models/Subscriptions & Payment/userSubscription");
const Subscription = require("../../models/Subscriptions & Payment/subscription");

exports.subscribeUser = async (req, res) => {
  try {
    const { userId, subscriptionId } = req.body;

    const subscription = await Subscription.findById(subscriptionId);
    if (!subscription) {
      return res.status(404).json({ message: "Subscription not found" });
    }

    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(startDate.getDate() + subscription.durationInDays);

    const userSub = await UserSubscription.create({
      userId,
      subscriptionId,
      startDate,
      endDate,
      isActive: true,
    });

    res.status(201).json(userSub);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getUserSubscriptions = async (req, res) => {
  try {
    const { userId } = req.params;
    const subs = await UserSubscription.find({ userId }).populate(
      "subscriptionId"
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
      { isActive: false },
      { new: true }
    );
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
