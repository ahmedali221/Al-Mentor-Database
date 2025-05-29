const express = require("express");
const router = express.Router();
const instructorSessionController = require("../../controllers/Users/instructorSessionController");

// Request a new session with an instructor (chat or video)
// @route   POST /
// @desc    Request a new instructor session (chat only)
// @access  Private
router.post("/", instructorSessionController.requestSession);

// Get all sessions for a user
router.get("/user/:userId", instructorSessionController.getUserSessions);

// Get all sessions for an instructor
router.get(
  "/instructor/:instructorId",
  instructorSessionController.getInstructorSessions
);

// Get a specific session by ID
router.get("/:sessionId", instructorSessionController.getSessionById);

// Approve a session request (instructor only)
router.put("/:sessionId/approve", instructorSessionController.approveSession);

// Reject a session request (instructor only)
router.put("/:sessionId/reject", instructorSessionController.rejectSession);

// Mark a session as completed
router.put("/:sessionId/complete", instructorSessionController.completeSession);

// Cancel a session
router.put("/:sessionId/cancel", instructorSessionController.cancelSession);

module.exports = router;
