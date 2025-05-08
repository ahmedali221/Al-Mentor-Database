const Enrollment = require("../../models/Subscriptions & Payment/Enrollment");
const User = require("../../models/Users/user");
const Course = require("../../models/Topics & Courses/course");
const UserSubscription = require("../../models/Subscriptions & Payment/userSubscription"); // Add this import

exports.createEnrollment = async (req, res) => {
  try {
    const { user, course } = req.body;
    if (!user || !course) {
      return res.status(400).json({ message: "User and Course are required" });
    }

    const userDoc = await User.findById(user);
    if (!userDoc) {
      return res.status(404).json({ message: "User not found" });
    }

    const courseDoc = await Course.findById(course);
    if (!courseDoc) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Find an active user subscription for this user
    const activeUserSubscription = await UserSubscription.findOne({
      userId: user,
      "status.en": "active",
    });

    if (!activeUserSubscription) {
      return res.status(403).json({ message: "No active subscription found" });
    }

    const enrollment = await Enrollment.create({
      user,
      course,
      subscription: activeUserSubscription.subscriptionId, // or .subscription if that's the field name
      status: { en: "active", ar: "نشط" },
    });

    res.status(201).json({
      message: "Enrollment created successfully",
      enrollment,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getEnrollmentsByUser = async (req, res) => {
  try {
    const { user } = req.params;
    const enrollments = await Enrollment.find({ user }).populate("course");
    res.status(200).json(enrollments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
