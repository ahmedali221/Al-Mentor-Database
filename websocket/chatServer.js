const WebSocket = require("ws");
const mongoose = require("mongoose");
const Chat = require("../models/Users/chat");
const InstructorSession = require("../models/Users/instructorSession");

function initializeWebSocketServer(server) {
  const wss = new WebSocket.Server({
    server,
    // Add CORS support
    verifyClient: (info, callback) => {
      const origin = info.origin || info.req.headers.origin;
      // Allow connections from localhost during development
      if (
        origin === "http://localhost:3000" ||
        origin === "http://127.0.0.1:3000"
      ) {
        callback(true);
      } else {
        callback(false, 403, "Forbidden");
      }
    },
  });

  // Store active connections
  const clients = new Map();

  wss.on("connection", async (ws, req) => {
    console.log("New WebSocket connection attempt");

    try {
      // Extract user ID and session ID from query parameters
      const url = new URL(req.url, "ws://localhost");
      const userId = url.searchParams.get("userId");
      const sessionId = url.searchParams.get("sessionId");

      if (!userId || !sessionId) {
        console.log("Connection rejected: Missing userId or sessionId");
        ws.close(1008, "Missing userId or sessionId");
        return;
      }

      // Validate MongoDB ObjectIds
      if (
        !mongoose.Types.ObjectId.isValid(userId) ||
        !mongoose.Types.ObjectId.isValid(sessionId)
      ) {
        console.log("Connection rejected: Invalid userId or sessionId format");
        ws.close(1008, "Invalid userId or sessionId format");
        return;
      }

      // Store the connection
      const connectionId = `${userId}-${sessionId}`;
      clients.set(connectionId, ws);
      console.log(`Client connected: ${connectionId}`);

      // Send chat history when connection is established
      try {
        const session = await InstructorSession.findById(sessionId)
          .populate("chat")
          .populate("user", "username firstName lastName")
          .populate({
            path: "instructor",
            populate: {
              path: "user",
              select: "username firstName lastName",
            },
          });

        if (!session) {
          console.log(`Session not found: ${sessionId}`);
          ws.close(1008, "Session not found");
          return;
        }

        if (session.chat) {
          ws.send(
            JSON.stringify({
              type: "chat_history",
              data: session.chat.messages,
            })
          );
          console.log(`Chat history sent to client: ${connectionId}`);
        }
      } catch (error) {
        console.error("Error fetching chat history:", error);
        ws.send(
          JSON.stringify({
            type: "error",
            message: "Error fetching chat history",
          })
        );
      }

      ws.on("message", async (message) => {
        try {
          const data = JSON.parse(message);

          // Validate message format
          if (!data.content || !data.role) {
            ws.send(
              JSON.stringify({
                type: "error",
                message: "Invalid message format",
              })
            );
            return;
          }

          // Find the session and update chat
          const session = await InstructorSession.findById(sessionId);
          if (!session) {
            ws.send(
              JSON.stringify({
                type: "error",
                message: "Session not found",
              })
            );
            return;
          }

          // Add message to chat
          const chat = await Chat.findById(session.chat);
          if (!chat) {
            ws.send(
              JSON.stringify({
                type: "error",
                message: "Chat not found",
              })
            );
            return;
          }

          chat.messages.push({
            role: data.role,
            content: data.content,
            timestamp: new Date(),
          });
          await chat.save();

          // Broadcast message to all connected clients for this session
          const messageToSend = {
            type: "new_message",
            data: {
              role: data.role,
              content: data.content,
              timestamp: new Date(),
            },
          };

          // Send to all clients connected to this session
          clients.forEach((client, key) => {
            if (
              key.includes(sessionId) &&
              client.readyState === WebSocket.OPEN
            ) {
              client.send(JSON.stringify(messageToSend));
            }
          });
        } catch (error) {
          console.error("Error handling message:", error);
          ws.send(
            JSON.stringify({
              type: "error",
              message: "Error processing message",
            })
          );
        }
      });

      ws.on("close", (code, reason) => {
        console.log(
          `Client disconnected: ${connectionId}, Code: ${code}, Reason: ${reason}`
        );
        clients.delete(connectionId);
      });

      ws.on("error", (error) => {
        console.error(`WebSocket error for client ${connectionId}:`, error);
      });
    } catch (error) {
      console.error("Error in WebSocket connection handler:", error);
      ws.close(1011, "Internal server error");
    }
  });

  // Add error handler for the WebSocket server
  wss.on("error", (error) => {
    console.error("WebSocket server error:", error);
  });

  return wss;
}

module.exports = initializeWebSocketServer;
