const express = require("express");
const router = express.Router();
const {
  createSubTopic,
  getSubTopicsByTopic,
  getSubTopicById,
  updateSubTopic,
  deleteSubTopic,
   getAllSubTopics,
} = require("../controllers/Topics & Courses/subTopicController");
router.get("/", getAllSubTopics);
router.post("/", createSubTopic);
router.get("/topic/:topicId", getSubTopicsByTopic);
router.get("/:id", getSubTopicById);
router.put("/:id", updateSubTopic);
router.delete("/:id", deleteSubTopic);

module.exports = router;
