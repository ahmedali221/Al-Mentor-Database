const UserSubscription = require("../../models/Subscriptions & Payment/userSubscription");
const Subscription = require("../../models/Subscriptions & Payment/subscription");

exports.subscribeUser = async (req, res) => {
  try {
    const { userId, subscriptionId } = req.body;

    if (!userId || !subscriptionId) {
      return res
        .status(400)
        .json({ message: "User ID and Subscription ID are required" });
    }

    const subscription = await Subscription.findById(subscriptionId);
    if (!subscription) {
      return res.status(404).json({ message: "Subscription not found" });
    }

    const durationInDays =
      subscription.duration.unit === "month"
        ? subscription.duration.value * 30
        : subscription.duration.value;

    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(startDate.getDate() + durationInDays);

    // Check if user already has an active subscription
    const existingSubscription = await UserSubscription.findOne({
      userId: userId,
      "status.en": "active",
    });

    if (existingSubscription) {
      existingSubscription.subscriptionId = subscriptionId;
      existingSubscription.startDate = startDate;
      existingSubscription.endDate = endDate;
      existingSubscription.status = { en: "active", ar: "نشط" };
      await existingSubscription.save();

      return res.status(200).json({
        message: "Subscription updated successfully",
        subscription: existingSubscription,
      });
    }

    // Create new subscription
    const userSub = await UserSubscription.create({
      userId,
      subscriptionId,
      startDate,
      endDate,
      status: { en: "active", ar: "نشط" },
    });

    res.status(201).json({
      message: "Subscription created successfully",
      subscription: userSub,
    });
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

exports.getAllUserSubscriptions = async (req, res) => {
  try {
    const userSubscriptions = await UserSubscription.find()
      .populate("subscriptionId")
      .populate("userId");
    res.status(200).json(userSubscriptions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.cancelSubscription = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the subscription by ID
    const subscription = await UserSubscription.findById(id);

    if (!subscription) {
      return res
        .status(404)
        .json({ message: "The specified user subscription does not exist" });
    }

    // Check if the subscription has expired
    const currentDate = new Date();
    if (subscription.endDate < currentDate) {
      subscription.status = { en: "expired", ar: "منتهي" };
      await subscription.save();

      return res.status(200).json({
        message: "Subscription status updated to expired successfully",
        subscription,
      });
    }

    // Toggle the status based on the current value
    const newStatus =
      subscription.status.en === "active"
        ? { en: "canceled", ar: "ملغي" }
        : { en: "active", ar: "نشط" };

    // Update the subscription with the new status
    subscription.status = newStatus;
    await subscription.save();

    res.status(200).json({
      message: `Subscription status updated to ${newStatus.en} successfully`,
      subscription,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.activeSubscription = async (req, res) => {
  try {
    const { id } = req.params;

    const subscription = await UserSubscription.findById(id);
    if (!subscription) {
      return res.status(404).json({ message: "Subscription not found" });
    }

    subscription.status = { en: "active", ar: "نشط" }; // Set status as an object
    await subscription.save();

    res.status(200).json(subscription);
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
