const express = require("express");
const router = express.Router();
const {
  createUserProgramProgress,
  getAllUserProgramProgress,
  getUserProgramProgressById,
  getUserProgramProgressByUserId,
  updateUserProgramProgress,
  deleteUserProgramProgress,
} = require("../../controllers/Programs/userProgramProgressController");

router.post("/", createUserProgramProgress);
router.get("/", getAllUserProgramProgress);
router.get("/:id", getUserProgramProgressById);
router.get("/user/:userId", getUserProgramProgressByUserId);
router.put("/:id", updateUserProgramProgress);
router.delete("/:id", deleteUserProgramProgress);

module.exports = router;
