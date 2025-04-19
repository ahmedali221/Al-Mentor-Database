const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const courseRoutes = require("./Routes/courseRoutes");
const moduleRoutes = require("./Routes/moduleRoutes");
const topicRoutes = require("./Routes/topicRoutes");
const subTopicRoutes = require("./Routes/subTopicRoutes");
const lessonRoutes = require("./Routes/lessonRoutes");
const userRoutes = require("./Routes/userRoute");

const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/coursesDB")
  .then(() => console.log("MongoDB connected!"))
  .catch((err) => console.error(err));

// Use routes
app.use("/api/courses", courseRoutes);
app.use("/api/modules", moduleRoutes);
app.use("/api/topics", topicRoutes);
app.use("/api/subtopics", subTopicRoutes);
app.use("/api/lessons", lessonRoutes);
app.use("/api/users", userRoutes);

// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
