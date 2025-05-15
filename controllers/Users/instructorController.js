const Instructor = require("../../models/Users/instructor");

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
    ).populate("user");

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
const instructors = await Instructor.find().populate("user");
    res.status(200).json({
      success: true,
      message: "Instructors retrieved successfully",
      data: instructors,
      count: instructors.length,
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
      "user"
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

module.exports = {
  createInstructor,
  getallInstructors,
  getInstructorById,
  updateInstructor,
  deleteInstructor,
};
