const express = require("express");
const router = express.Router();
const {
  createTopic,
  getTopicsByCourse,
  getAllTopics,
  getTopicById,
  updateTopic,
  deleteTopic,
  getTopicsByLesson,
} = require("../../controllers/Topics & Courses/topicController");

router.post("/", createTopic);
router.get("/", getAllTopics);
router.get("/:id", getTopicById);
router.get("/course/:courseId", getTopicsByCourse);
router.put("/:id", updateTopic);
router.delete("/:id", deleteTopic);
router.get("/lesson/:lessonId", getTopicsByLesson);

module.exports = router;
