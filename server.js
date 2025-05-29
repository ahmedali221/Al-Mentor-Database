const express = require("express");
const http = require("http");
const connectDB = require("./config/db");
const initializeWebSocketServer = require("./websocket/chatServer");
// Users Routes
const userRoutes = require("./routes/Users/userRoute");
const instructorRoutes = require("./routes/Users/instructorRoutes");
const userSavedCourseRoutes = require("./routes/Users/userSavedCourseRoutes");
const chatRoutes = require("./routes/Users/chatRoutes");
const instructorSessionRoutes = require("./routes/Users/instructorSessionRoutes");

// Courses Routes
const courseRoutes = require("./routes/Topics & Courses/courseRoutes");
const lessonRoutes = require("./routes/Topics & Courses/lessonRoutes");
const moduleRoutes = require("./routes/Topics & Courses/moduleRoutes");
const topicRoutes = require("./routes/Topics & Courses/topicRoutes");
const categoryRoutes = require("./routes/Topics & Courses/categoryRoutes");
const subTopicRoutes = require("./routes/Topics & Courses/subTopicRoutes");
const favoriteLessonRoutes = require("./routes/Topics & Courses/favoriteLessonRoutes");

// Auth Route
const authRoutes = require("./routes/Users/authRoutes");

// Enrollment Routes
const enrollmentRoutes = require("./routes/Subscription & Payment/EnrollmentRoutes");
const paymentRoutes = require("./routes/Subscription & Payment/PaymentRoutes");
const subscriptionRoutes = require("./routes/Subscription & Payment/subscriptionRoutes");
const userSubscriptionRoutes = require("./routes/Subscription & Payment/userSubscriptionRoutes");
const stripeRoutes = require("./routes/Subscription & Payment/stripeRoute");
const webhookRoutes = require("./routes/Subscription & Payment/Webhook");

// Programs Routes
const programRoutes = require("./routes/Programs/programRoute");
const programCourseRoutes = require("./routes/Programs/programCourseRoute");
const userProgramProgressRoutes = require("./routes/Programs/userProgramProgressRoute");

const cors = require("cors");
const app = express();
const server = http.createServer(app);

// Initialize WebSocket server
const wss = initializeWebSocketServer(server);

// Connect To LocalHost
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(cors());
app.use(express.json());

require("dotenv").config();

connectDB().then(() => {
  // Routes
  app.use("/api/auth", authRoutes);
  app.use("/api/users", userRoutes);
  app.use("/api/instructors", instructorRoutes);
  app.use("/api/saved-courses", userSavedCourseRoutes);
  app.use("/api/category", categoryRoutes);
  app.use("/api/courses", courseRoutes);
  app.use("/api/lessons", lessonRoutes);
  app.use("/api/modules", moduleRoutes);
  app.use("/api/topics", topicRoutes);
  app.use("/api/subtopics", subTopicRoutes);
  app.use("/api/enrollments", enrollmentRoutes);
  app.use("/api/payments", paymentRoutes);
  app.use("/api/subscriptions", subscriptionRoutes);
  app.use("/api/user-subscriptions", userSubscriptionRoutes);
  app.use("/api/stripe", stripeRoutes);
  app.use("/api/programs", programRoutes);
  app.use("/api/program-courses", programCourseRoutes);
  app.use("/api/user-program-progress", userProgramProgressRoutes);
  app.use("/api/favorite-lessons", favoriteLessonRoutes);
  app.use("/api/chats", chatRoutes);
  app.use("/api/instructor-sessions", instructorSessionRoutes);
  app.use("/api", webhookRoutes);

  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Something went wrong!" });
  });

  const PORT = process.env.PORT || 5000;
  server.listen(PORT, () => console.log(`Server started on port ${PORT}`));
});
