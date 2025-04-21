const Topic = require("../../models/Topics & Courses/topic");
const Course = require("../../models/Topics & Courses/course");

const createTopic = async (req, res) => {
  try {
    const topic = await Topic.create(req.body);
    res.status(201).json(topic);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getAllTopics = async (req, res) => {
  try {
    const topics = await Topic.find();
    res.status(200).json(topics);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTopicById = async (req, res) => {
  try {
    const topic = await Topic.findById(req.params.id);
    if (!topic) {
      return res.status(404).json({ message: "Topic not found" });
    }
    res.status(200).json(topic);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateTopic = async (req, res) => {
  try {
    const topic = await Topic.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!topic) {
      return res.status(404).json({ message: "Topic not found" });
    }
    res.status(200).json(topic);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteTopic = async (req, res) => {
  try {
    const topic = await Topic.findByIdAndDelete(req.params.id);
    if (!topic) {
      return res.status(404).json({ message: "Topic not found" });
    }
    res.status(200).json({ message: "Topic deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Courses by Topic
const getCoursesByTopic = async (req, res) => {
  try {
    const { id } = req.params;
    
    // First verify the topic exists
    const topic = await Topic.findById(id);
    if (!topic) {
      return res.status(404).json({ message: "Topic not found" });
    }
    
    // Get all courses for this topic
    const courses = await Course.find({ topic: id })
      .populate("instructor", "name email role")
      .populate("topic", "name")
      .populate("subTopic", "name");
    
    res.status(200).json({
      topic: {
        id: topic._id,
        name: topic.name,
        description: topic.description
      },
      count: courses.length,
      courses
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createTopic,
  getAllTopics,
  getTopicById,
  updateTopic,
  deleteTopic,
  getCoursesByTopic
};
