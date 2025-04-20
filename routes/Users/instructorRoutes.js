const express = require("express");
const router = express.Router();
const {
  createInstructor,
  getallInstructors,
  getInstructorById,
  updateInstructor,
  deleteInstructor,
} = require("../../controllers/Users/instructorController");

router.get("/", getallInstructors);
router.post("/", createInstructor);
router.get("/:id", getInstructorById);
router.put("/:id", updateInstructor);
router.delete("/:id", deleteInstructor);
module.exports = router;
