const Course = require("../../models/Topics & Courses/course");

const createCourse = async (req, res) => {
  try {
    const course = await Course.create(req.body);
    res.status(201).json(course);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find()
      .populate("instructorDetails")
      .populate({
        path: "modules",
        populate: {
          path: "lessons"
        }
      });
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Apply similar changes to getCourseById, getCoursesByInstructor, and getCoursesByCategory
const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)
      .populate({
        path: "instructor",
        populate: {
          path: "user", // populate the user inside the instructor
        },
      })
      .populate({
        path: "modules",
        populate: {
          path: "lessons"
        }
      });

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCoursesByInstructor = async (req, res) => {
  try {
    const { instructorId } = req.params;

    const courses = await Course.find({ instructor: instructorId })
      .populate({
        path: "instructor",
        populate: {
          path: "user",
        },
      })
      .populate({
        path: "modules",
        populate: {
          path: "lessons",
        },
      });

    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Course
const updateCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
      .populate("instructor")
      .populate({
        path: "modules",
        populate: {
          path: "lessons",
        },
      });
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.status(200).json(course);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete Course
const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.status(200).json({ message: "Course deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCoursesByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const courses = await Course.find({ category: categoryId })
      .populate({
        path: "instructor",
        populate: {
          path: "user",
        },
      })
      .populate({
        path: "modules",
        populate: {
          path: "lessons",
        },
      });
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
  getCoursesByInstructor,
  getCoursesByCategory,
};
