const Lesson = require("../../models/Topics & Courses/lesson");

const createLesson = async (req, res) => {
  try {
    const lesson = await Lesson.create(req.body);
    const populated = await lesson.populate("course");
    res.status(201).json(populated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getAllLessons = async (req, res) => {
  try {
    const lessons = await Lesson.find().populate([
      {
        path: "course",
        populate: {
          path: "instructor",
          populate: { path: "user" },
        },
      },
      {
        path: "module",
      },
    ]);
    res.status(200).json(lessons);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getLessonsByCourse = async (req, res) => {
  try {
    const lessons = await Lesson.find({ course: req.params.courseId }).populate(
      [
        {
          path: "course",
          populate: {
            path: "instructor",
            populate: { path: "user" },
          },
        },
        {
          path: "module",
        },
      ]
    );
    res.status(200).json(lessons);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Lesson By ID
const getLessonById = async (req, res) => {
  try {
    console.log("Requested ID:", req.params.id);

    const lesson = await Lesson.findById(req.params.id);

    if (!lesson) {
      return res.status(404).json({ message: "Lesson not found" });
    }

    res.status(200).json(lesson);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateLesson = async (req, res) => {
  try {
    const lesson = await Lesson.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).populate("course");
    if (!lesson) {
      return res.status(404).json({ message: "Lesson not found" });
    }
    res.status(200).json(lesson);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteLesson = async (req, res) => {
  try {
    const lesson = await Lesson.findByIdAndDelete(req.params.id);
    if (!lesson) {
      return res.status(404).json({ message: "Lesson not found" });
    }
    res.status(200).json({ message: "Lesson deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createLesson,
  getLessonsByCourse,
  getLessonById,
  updateLesson,
  deleteLesson,
  getAllLessons,
};
