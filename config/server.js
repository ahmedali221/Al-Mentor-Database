const express = require("express");
const connectDB = require("./db");
// Users Routes
const userRoutes = require("../routes/Users/userRoute");
const instructorRoutes = require("../routes/Users/instructorRoutes");

// Courses Routes
const courseRoutes = require("../routes/Topics & Courses/courseRoutes");
const lessonRoutes = require("../routes/Topics & Courses/lessonRoutes");
const moduleRoutes = require("../routes/Topics & Courses/moduleRoutes");
const topicRoutes = require("../routes/Topics & Courses/topicRoutes");
const subtopicRoutes = require("../routes/Topics & Courses/subTopicsRoutes");
const favoriteLessonRoutes = require("./routes/Topics & Courses/favoriteLessonRoutes");

// Enrollment Routes
const enrollmentRoutes = require("../routes/Subscription & Payment/enrollmentRoutes");
const paymentRoutes = require("../routes/Subscription & Payment/paymentRoutes");
const subscriptionPlanRoutes = require("../routes/Subscription & Payment/subscriptionPlanRoutes");
const userSubscriptionRoutes = require("../routes/Subscription & Payment/userSubscriptionRoutes");
// Programs Routes
const programRoutes = require("../routes/Programs/programRoutes");
const programCourseRoutes = require("../routes/Programs/programCourseRoute");
const userProgramProgressRoutes = require("../routes/Programs/userProgramProgressRoute");

const cors = require("cors");
const app = express();

// Connect To LocalHost
app.use(
  cors({
    origin: "http://localhost:4200",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

connectDB().then(() => {
  // Routes
  app.use("/api/users", userRoutes);
  app.use("/api/instructors", instructorRoutes);
  app.use("/api/courses", courseRoutes);
  app.use("/api/lessons", lessonRoutes);
  app.use("/api/modules", moduleRoutes);
  app.use("/api/topics", topicRoutes);
  app.use("/api/subtopics", subtopicRoutes);
  app.use("/api/enrollments", enrollmentRoutes);
  app.use("/api/payments", paymentRoutes);
  app.use("/api/subscription-plans", subscriptionPlanRoutes);
  app.use("/api/user-subscriptions", userSubscriptionRoutes);
  app.use("/api/programs", programRoutes);
  app.use("/api/program-courses", programCourseRoutes);
  app.use("/api/user-program-progress", userProgramProgressRoutes);
  app.use("/api/favorite-lessons", favoriteLessonRoutes);

  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Something went wrong!" });
  });

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
});
