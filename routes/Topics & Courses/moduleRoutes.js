const express = require("express");
const router = express.Router();
const {
  createModule,
  getModulesByCourse,
} = require("../../controllers/Topics & Courses/moduleController");

router.post("/", createModule);
router.get("/course/:courseId", getModulesByCourse);

module.exports = router;
