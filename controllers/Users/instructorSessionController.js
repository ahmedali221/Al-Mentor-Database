const InstructorSession = require("../../models/Users/instructorSession");
const Instructor = require("../../models/Users/instructor");
const User = require("../../models/Users/user");

// Request a new session with an instructor
exports.requestSession = async (req, res) => {
  try {
    const {
      userId,
      instructorId,
      title,
      description,
      requestedDate,
      requestedDuration,
    } = req.body;

    // Validate required fields
    if (
      !userId ||
      !instructorId ||
      !title ||
      !description ||
      !requestedDate ||
      !requestedDuration
    ) {
      return res.status(400).json({
        message:
          "User ID, instructor ID, title, description, requested date, and duration are required",
      });
    }

    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if instructor exists
    const instructor = await Instructor.findById(instructorId);
    if (!instructor) {
      return res.status(404).json({ message: "Instructor not found" });
    }

    // Create new session request
    const session = await InstructorSession.create({
      user: userId,
      instructor: instructorId,
      title,
      description,
      requestedDate: new Date(requestedDate),
      requestedDuration,
      status: "pending",
    });

    // Return the created session
    const populatedSession = await InstructorSession.findById(session._id)
      .populate("user", "username email firstName lastName")
      .populate({
        path: "instructor",
        populate: {
          path: "user",
          select: "username email firstName lastName",
        },
      });

    res.status(201).json({
      success: true,
      message: "Session request created successfully",
      data: populatedSession,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all sessions for a user
exports.getUserSessions = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const sessions = await InstructorSession.find({ user: userId })
      .populate("instructor", "professionalTitle expertiseAreas")
      .populate({
        path: "instructor",
        populate: {
          path: "user",
          select: "username firstName lastName profilePicture",
        },
      })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: sessions.length,
      data: sessions,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all sessions for an instructor
exports.getInstructorSessions = async (req, res) => {
  try {
    const { instructorId } = req.params;

    if (!instructorId) {
      return res.status(400).json({ message: "Instructor ID is required" });
    }

    const sessions = await InstructorSession.find({ instructor: instructorId })
      .populate("user", "username email firstName lastName profilePicture")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: sessions.length,
      data: sessions,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a specific session by ID
exports.getSessionById = async (req, res) => {
  try {
    const { sessionId } = req.params;

    if (!sessionId) {
      return res.status(400).json({ message: "Session ID is required" });
    }

    const session = await InstructorSession.findById(sessionId)
      .populate("user", "username email firstName lastName profilePicture")
      .populate({
        path: "instructor",
        populate: {
          path: "user",
          select: "username firstName lastName profilePicture",
        },
      });

    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    res.status(200).json({
      success: true,
      data: session,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Approve a session request (instructor only)
exports.approveSession = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const { meetingLink } = req.body;

    if (!sessionId) {
      return res.status(400).json({ message: "Session ID is required" });
    }

    const session = await InstructorSession.findById(sessionId);

    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    if (session.status !== "pending") {
      return res.status(400).json({
        message: `Cannot approve session with status: ${session.status}`,
      });
    }

    session.status = "approved";
    session.approvalDate = new Date();
    if (meetingLink) {
      session.meetingLink = meetingLink;
    }

    await session.save();

    const updatedSession = await InstructorSession.findById(sessionId)
      .populate("user", "username email firstName lastName")
      .populate({
        path: "instructor",
        populate: {
          path: "user",
          select: "username firstName lastName",
        },
      });

    res.status(200).json({
      success: true,
      message: "Session approved successfully",
      data: updatedSession,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Reject a session request (instructor only)
exports.rejectSession = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const { rejectionReason } = req.body;

    if (!sessionId) {
      return res.status(400).json({ message: "Session ID is required" });
    }

    const session = await InstructorSession.findById(sessionId);

    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    if (session.status !== "pending") {
      return res.status(400).json({
        message: `Cannot reject session with status: ${session.status}`,
      });
    }

    session.status = "rejected";
    session.rejectionReason = rejectionReason || "No reason provided";

    await session.save();

    res.status(200).json({
      success: true,
      message: "Session rejected successfully",
      data: session,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Mark a session as completed
exports.completeSession = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const { notes } = req.body;

    if (!sessionId) {
      return res.status(400).json({ message: "Session ID is required" });
    }

    const session = await InstructorSession.findById(sessionId);

    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    if (session.status !== "approved") {
      return res.status(400).json({
        message: "Only approved sessions can be marked as completed",
      });
    }

    session.status = "completed";
    if (notes) {
      session.notes = notes;
    }

    await session.save();

    res.status(200).json({
      success: true,
      message: "Session marked as completed",
      data: session,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Cancel a session
exports.cancelSession = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const { cancelReason } = req.body;

    if (!sessionId) {
      return res.status(400).json({ message: "Session ID is required" });
    }

    const session = await InstructorSession.findById(sessionId);

    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    if (session.status === "completed") {
      return res.status(400).json({
        message: "Completed sessions cannot be cancelled",
      });
    }

    session.status = "cancelled";
    session.rejectionReason = cancelReason || "No reason provided";

    await session.save();

    res.status(200).json({
      success: true,
      message: "Session cancelled successfully",
      data: session,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
