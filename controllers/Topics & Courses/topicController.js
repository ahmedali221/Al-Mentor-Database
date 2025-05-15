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

    const topic = await Topic.findById(id);
    if (!topic) {
      return res.status(404).json({ message: "Topic not found" });
    }

   const courses = await Course.find({ topic: id })
  .populate({
    path: "instructor",
    populate: {
      path: "user",
      select: "username email firstName lastName profilePicture"
    }
  })
  .populate("topic", "name")
  .populate("subTopic", "name");

    res.status(200).json({
      topic: {
        id: topic._id,
        name: topic.name,
        description: topic.description,
      },
      count: courses.length,
      courses,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Topics by Course
const getTopicsByCourse = async (req, res) => {
  try {
    const { id } = req.params;

    // Verify the course exists
    const course = await Course.findById(id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Get all topics associated with this course
    const topics = await Topic.find({ course: id });

    res.status(200).json({
      course: {
        id: course._id,
        name: course.name,
        description: course.description,
      },
      count: topics.length,
      topics,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Topics by Lesson
const getTopicsByLesson = async (req, res) => {
  try {
    const { id } = req.params;

    // Verify the lesson exists
    const lesson = await Lesson.findById(id);
    if (!lesson) {
      return res.status(404).json({ message: "Lesson not found" });
    }

    // Get all topics associated with this lesson
    const topics = await Topic.find({ lesson: id });

    res.status(200).json({
      lesson: {
        id: lesson._id,
        name: lesson.name,
        description: lesson.description,
      },
      count: topics.length,
      topics,
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
  getCoursesByTopic,
  getTopicsByCourse,
  getTopicsByLesson,
};
