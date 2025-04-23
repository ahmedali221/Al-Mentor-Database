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
      // This is like second Population
      // After Showing the instructor data we populate the user field and get its data from the ref id
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

module.exports = {
  createProgram,
  getAllPrograms,
  getProgramById,
  updateProgram,
  deleteProgram,
};
