const Chat = require("../../models/Users/chat");

// Create a new chat or add a message to an existing chat
exports.saveChat = async (req, res) => {
  try {
    const { userId, chatId, message, role } = req.body;

    if (!userId || !message) {
      return res
        .status(400)
        .json({ message: "User ID and message are required" });
    }

    // If chatId is provided, add message to existing chat
    if (chatId) {
      const chat = await Chat.findById(chatId);

      if (!chat) {
        return res.status(404).json({ message: "Chat not found" });
      }

      if (chat.user.toString() !== userId) {
        return res
          .status(403)
          .json({ message: "Unauthorized access to this chat" });
      }

      chat.messages.push({
        role: role || "user",
        content: message,
        timestamp: new Date(),
      });

      chat.updatedAt = new Date();
      await chat.save();

      return res.status(200).json({
        success: true,
        message: "Message added to chat",
        data: chat,
      });
    }

    // Create a new chat
    const newChat = await Chat.create({
      user: userId,
      messages: [
        {
          role: role || "user",
          content: message,
          timestamp: new Date(),
        },
      ],
    });

    res.status(201).json({
      success: true,
      message: "New chat created",
      data: newChat,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all chats for a user
exports.getUserChats = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const chats = await Chat.find({ user: userId }).sort({ updatedAt: -1 });

    res.status(200).json({
      success: true,
      count: chats.length,
      data: chats,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a specific chat by ID
exports.getChatById = async (req, res) => {
  try {
    const { chatId } = req.params;

    if (!chatId) {
      return res.status(400).json({ message: "Chat ID is required" });
    }

    const chat = await Chat.findById(chatId);

    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }

    res.status(200).json({
      success: true,
      data: chat,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update chat title
exports.updateChatTitle = async (req, res) => {
  try {
    const { chatId } = req.params;
    const { title } = req.body;

    if (!chatId || !title) {
      return res
        .status(400)
        .json({ message: "Chat ID and title are required" });
    }

    const chat = await Chat.findById(chatId);

    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }

    chat.title = title;
    await chat.save();

    res.status(200).json({
      success: true,
      message: "Chat title updated",
      data: chat,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a chat
exports.deleteChat = async (req, res) => {
  try {
    const { chatId } = req.params;

    if (!chatId) {
      return res.status(400).json({ message: "Chat ID is required" });
    }

    const chat = await Chat.findByIdAndDelete(chatId);

    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }

    res.status(200).json({
      success: true,
      message: "Chat deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
