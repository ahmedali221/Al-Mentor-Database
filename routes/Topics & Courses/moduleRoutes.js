const express = require("express");
const router = express.Router();
const {
  createModule,
  getModulesByCourse,
  getModuleById,
} = require("../../controllers/Topics & Courses/moduleController");

router.post("/", createModule);
router.get("/course/:courseId", getModulesByCourse);
router.get("/:id", getModuleById);

module.exports = router;
