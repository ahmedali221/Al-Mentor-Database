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

exports.deleteSubscription = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedSub = await Subscription.findByIdAndDelete(id);
    if (!deletedSub) {
      return res
        .status(404)
        .json({ message: "The specified subscription does not exist" });
    }
    res.status(200).json({ message: "Subscription deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateSubscription = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedSub = await Subscription.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedSub) {
      return res
        .status(404)
        .json({ message: "The specified subscription does not exist" });
    }
    res.status(200).json(updatedSub);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
