const Program = require("../../models/Programs/program");

const createProgram = async (req, res) => {
  try {
    const program = await Program.create(req.body);
    res.status(201).json(program);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getAllPrograms = async (req, res) => {
  try {
    const programs = await Program.find().populate({
      path: "courseDetails",
    });
    res.status(200).json(programs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProgramById = async (req, res) => {
  try {
    const program = await Program.findById(req.params.id).populate({
      path: "courseDetails",
    });

    if (!program) {
      return res.status(404).json({ message: "Program not found" });
    }
    res.status(200).json(program);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateProgram = async (req, res) => {
  try {
    const program = await Program.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!program) {
      return res.status(404).json({ message: "Program not found" });
    }
    res.status(200).json(program);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteProgram = async (req, res) => {
  try {
    const program = await Program.findByIdAndDelete(req.params.id);
    if (!program) {
      return res.status(404).json({ message: "Program not found" });
    }
    res.status(200).json({ message: "Program deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addCourseToProgram = async (req, res) => {
  try {
    const { programId, courseId } = req.body;

    const program = await Program.findById(programId);
    if (!program) {
      return res.status(404).json({ message: "Program not found" });
    }

    // Check if course already exists in program
    if (program.courses.includes(courseId)) {
      return res
        .status(400)
        .json({ message: "Course already exists in this program" });
    }

    // Add course to program
    program.courses.push(courseId);
    await program.save();

    // Return updated program with populated course details
    const updatedProgram = await Program.findById(programId).populate({
      path: "courseDetails",
    });

    res.status(200).json(updatedProgram);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const removeCourseFromProgram = async (req, res) => {
  try {
    const { programId, courseId } = req.body;

    const program = await Program.findById(programId);
    if (!program) {
      return res.status(404).json({ message: "Program not found" });
    }

    // Check if course exists in program
    if (!program.courses.includes(courseId)) {
      return res.status(400).json({ message: "Course is not in this program" });
    }

    // Remove course from program
    program.courses = program.courses.filter(
      (course) => course.toString() !== courseId
    );
    await program.save();

    // Return updated program with populated course details
    const updatedProgram = await Program.findById(programId).populate({
      path: "courseDetails",
    });

    res.status(200).json(updatedProgram);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createProgram,
  getAllPrograms,
  getProgramById,
  updateProgram,
  deleteProgram,
  addCourseToProgram,
  removeCourseFromProgram,
};
