const Instructor = require("../../models/Users/instructor");
const Course = require("../../models/Topics & Courses/course"); // Add this at the top

const createInstructor = async (req, res) => {
  try {
    const existingInstructor = await Instructor.findOne({
      user: req.body.user,
    });

    if (existingInstructor) {
      return res.status(409).json({
        success: false,
        message: "Instructor with this user ID already exists",
      });
    }

    const instructor = await Instructor.create(req.body);

    const populatedInstructor = await Instructor.findById(
      instructor._id
    ).populate("profile");

    res.status(201).json({
      success: true,
      message: "Instructor created successfully",
      data: populatedInstructor,
    });
  } catch (error) {
    if (error.code === 11000 && error.keyPattern && error.keyPattern.user) {
      return res.status(409).json({
        success: false,
        message: "Instructor with this user ID already exists",
      });
    }
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const getallInstructors = async (req, res) => {
  try {
    const page = parseInt(req.query.page) > 0 ? parseInt(req.query.page) : 1;
    const limit =
      parseInt(req.query.limit) > 0 ? parseInt(req.query.limit) : 12;
    const skip = (page - 1) * limit;

    const total = await Instructor.countDocuments();
    const instructors = await Instructor.find()
      .skip(skip)
      .limit(limit)
      .populate("profile");

    res.status(200).json({
      success: true,
      message: "Instructors retrieved successfully",
      data: instructors,
      count: instructors.length,
      page,
      totalPages: Math.ceil(total / limit),
      total,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const getInstructorById = async (req, res) => {
  try {
    const instructor = await Instructor.findById(req.params.id).populate(
      "profile"
    );
    if (!instructor) {
      return res.status(404).json({
        success: false,
        message: "Instructor not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Instructor retrieved successfully",
      data: instructor,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateInstructor = async (req, res) => {
  try {
    const instructor = await Instructor.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!instructor) {
      return res.status(404).json({
        success: false,
        message: "Instructor not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Instructor updated successfully",
      data: instructor,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteInstructor = async (req, res) => {
  try {
    const instructor = await Instructor.findByIdAndDelete(req.params.id);
    if (!instructor) {
      return res.status(404).json({
        success: false,
        message: "Instructor not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Instructor deleted successfully",
      data: null,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getInstructorCourses = async (req, res) => {
  try {
    const { id } = req.params; // instructor id
    const courses = await Course.find({ instructor: id }).populate("category");
    res.status(200).json({
      success: true,
      message: "Instructor courses retrieved successfully",
      data: courses,
      count: courses.length,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createInstructor,
  getallInstructors,
  getInstructorById,
  updateInstructor,
  deleteInstructor,
  getInstructorCourses, // Add this line
};
