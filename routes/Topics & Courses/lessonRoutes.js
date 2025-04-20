const express = require("express");
const router = express.Router();
const {
  createLesson,
  getLessonsByCourse,
  getLessonById,
  updateLesson,
  deleteLesson,
} = require("../../controllers/Topics & Courses/lessonController");

router.post("/", createLesson);
router.get("/course/:courseId", getLessonsByCourse);
router.get("/:id", getLessonById); // Get lesson by ID
router.put("/:id", updateLesson); // Update lesson
router.delete("/:id", deleteLesson); // Delete lesson

module.exports = router;
