const Enrollment = require("../../models/Subscriptions & Payment/Enrollment");
const User = require("../../models/Users/user");
const Course = require("../../models/Topics & Courses/course");
const Subscription = require("../../models/Subscriptions & Payment/subscription");

exports.createEnrollment = async (req, res) => {
  try {
    const { userId, courseId } = req.body;
    if (!userId || !courseId) {
      return res
        .status(400)
        .json({ message: "User ID and Course ID are required" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    const activeSubscription = await Subscription.findOne({
      userId,
      status: "active",
    });

    if (!activeSubscription) {
      return res.status(403).json({ message: "No active subscription found" });
    }

    const enrollment = await Enrollment.create({
      userId,
      courseId,
      subscriptionId: activeSubscription._id,
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
    const { userId } = req.params;
    const enrollments = await Enrollment.find({ userId }).populate("courseId");
    res.status(200).json(enrollments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
