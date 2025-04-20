const Subscription = require("../../models/Subscriptions & Payment/subscription");

exports.createSubscription = async (req, res) => {
  try {
    const newSub = await Subscription.create(req.body);
    res.status(201).json(newSub);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getAllSubscriptions = async (req, res) => {
  try {
    const subs = await Subscription.find();
    res.status(200).json(subs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
