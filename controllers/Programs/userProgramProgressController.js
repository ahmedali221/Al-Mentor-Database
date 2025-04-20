const UserProgramProgress = require("../../models/Programs/userProgramProgress");

const createUserProgramProgress = async (req, res) => {
  try {
    const progress = await UserProgramProgress.create(req.body);
    res.status(201).json(progress);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getAllUserProgramProgress = async (req, res) => {
  try {
    const progress = await UserProgramProgress.find()
      .populate("userId")
      .populate("programId")
      .populate("completedCourses");
    res.status(200).json(progress);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUserProgramProgressById = async (req, res) => {
  try {
    const progress = await UserProgramProgress.findById(req.params.id)
      .populate("userId")
      .populate("programId")
      .populate("completedCourses");
    if (!progress) {
      return res.status(404).json({ message: "Progress record not found" });
    }
    res.status(200).json(progress);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUserProgramProgressByUserId = async (req, res) => {
  try {
    const progress = await UserProgramProgress.find({
      userId: req.params.userId,
    })
      .populate("programId")
      .populate("completedCourses");
    res.status(200).json(progress);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateUserProgramProgress = async (req, res) => {
  try {
    const progress = await UserProgramProgress.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!progress) {
      return res.status(404).json({ message: "Progress record not found" });
    }
    res.status(200).json(progress);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteUserProgramProgress = async (req, res) => {
  try {
    const progress = await UserProgramProgress.findByIdAndDelete(req.params.id);
    if (!progress) {
      return res.status(404).json({ message: "Progress record not found" });
    }
    res.status(200).json({ message: "Progress record deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createUserProgramProgress,
  getAllUserProgramProgress,
  getUserProgramProgressById,
  getUserProgramProgressByUserId,
  updateUserProgramProgress,
  deleteUserProgramProgress,
};
