const SubTopic = require("../../models/Topics & Courses/SubTopic");

const createSubTopic = async (req, res) => {
  try {
    const subTopic = await SubTopic.create(req.body);
    res.status(201).json(subTopic);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getSubTopicsByTopic = async (req, res) => {
  try {
    const subTopics = await SubTopic.find({ topic: req.params.topicId });
    res.status(200).json(subTopics);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getSubTopicById = async (req, res) => {
  try {
    const subTopic = await SubTopic.findById(req.params.id);
    if (!subTopic) {
      return res.status(404).json({ message: "SubTopic not found" });
    }
    res.status(200).json(subTopic);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const updateSubTopic = async (req, res) => {
  try {
    const updatedSubTopic = await SubTopic.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedSubTopic) {
      return res.status(404).json({ message: "SubTopic not found" });
    }
    res.status(200).json(updatedSubTopic);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
const deleteSubTopic = async (req, res) => {
  try {
    const deleted = await SubTopic.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "SubTopic not found" });
    }
    res.status(200).json({ message: "SubTopic deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add this function
const getAllSubTopics = async (req, res) => {
  try {
    const subTopics = await SubTopic.find();
    res.status(200).json(subTopics);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createSubTopic,
  getSubTopicsByTopic,
  getSubTopicById,
  updateSubTopic,
  deleteSubTopic,
  getAllSubTopics, 
};
