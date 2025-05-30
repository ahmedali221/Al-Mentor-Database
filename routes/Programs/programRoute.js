const express = require("express");
const router = express.Router();
const {
  createProgram,
  getAllPrograms,
  getProgramById,
  updateProgram,
  deleteProgram,
  addCourseToProgram,
  removeCourseFromProgram,
} = require("../../controllers/Programs/programController");

router.post("/", createProgram);
router.get("/", getAllPrograms);
router.get("/:id", getProgramById);
router.put("/:id", updateProgram);
router.delete("/:id", deleteProgram);
router.post("/add-course", addCourseToProgram);
router.post("/remove-course", removeCourseFromProgram);

module.exports = router;
