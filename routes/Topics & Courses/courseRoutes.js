const express = require("express");
const router = express.Router();
const {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
  getCoursesByInstructor,
  getCoursesByCategory,
} = require("../../controllers/Topics & Courses/courseController");

router.post("/", createCourse);
router.get("/", getAllCourses);
router.get("/category/:categoryId", getCoursesByCategory);
router.get("/instructor/:instructorId", getCoursesByInstructor);
router.get("/:id", getCourseById);
router.put("/:id", updateCourse);
router.delete("/:id", deleteCourse);

module.exports = router;
