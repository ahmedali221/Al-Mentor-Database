const express = require("express");
const router = express.Router();
const authController = require("../../controllers/Users/authController");

router.post("/login", authController.login);
router.post("/checkEmail", authController.checkEmailExists);
router.post("/register", authController.register);
router.get("/check", authController.checkLoggedIn);

module.exports = router;
