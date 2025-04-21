const express = require("express");
const router = express.Router();
const {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
  getCoursesByInstructor
} = require("../../controllers/Topics & Courses/courseController");

router.post("/", createCourse);
router.get("/", getAllCourses);
router.get("/:id", getCourseById);
router.put("/:id", updateCourse);
router.delete("/:id", deleteCourse);
router.get("/instructor/:instructorId", getCoursesByInstructor);

module.exports = router;
