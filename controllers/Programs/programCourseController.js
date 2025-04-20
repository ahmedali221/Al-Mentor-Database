const ProgramCourse = require("../../models/Programs/programCourse");

const createProgramCourse = async (req, res) => {
  try {
    const programCourse = await ProgramCourse.create(req.body);
    res.status(201).json(programCourse);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getAllProgramCourses = async (req, res) => {
  try {
    const programCourses = await ProgramCourse.find()
      .populate("programId")
      .populate("courseId");
    res.status(200).json(programCourses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProgramCourseById = async (req, res) => {
  try {
    const programCourse = await ProgramCourse.findById(req.params.id)
      .populate("programId")
      .populate("courseId");
    if (!programCourse) {
      return res.status(404).json({ message: "Program Course not found" });
    }
    res.status(200).json(programCourse);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateProgramCourse = async (req, res) => {
  try {
    const programCourse = await ProgramCourse.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!programCourse) {
      return res.status(404).json({ message: "Program Course not found" });
    }
    res.status(200).json(programCourse);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteProgramCourse = async (req, res) => {
  try {
    const programCourse = await ProgramCourse.findByIdAndDelete(req.params.id);
    if (!programCourse) {
      return res.status(404).json({ message: "Program Course not found" });
    }
    res.status(200).json({ message: "Program Course deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createProgramCourse,
  getAllProgramCourses,
  getProgramCourseById,
  updateProgramCourse,
  deleteProgramCourse,
};
