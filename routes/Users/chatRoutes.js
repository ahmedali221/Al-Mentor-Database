const express = require("express");
const router = express.Router();
const chatController = require("../../controllers/Users/chatController");

// Save chat message or create new chat
router.post("/", chatController.saveChat);

// Get all chats for a user
router.get("/user/:userId", chatController.getUserChats);

// Get a specific chat by ID
router.get("/:chatId", chatController.getChatById);

// Update chat title
router.put("/:chatId/title", chatController.updateChatTitle);

// Delete a chat
router.delete("/:chatId", chatController.deleteChat);

module.exports = router;
