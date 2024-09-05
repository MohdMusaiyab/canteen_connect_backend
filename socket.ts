import { Server as HttpServer } from "http";
import { Server, Socket } from "socket.io";

export const userSocketMap = new Map<string, Set<string>>(); // Map of userId -> Set of socketIds

// Declare a variable to hold the Socket.IO instance
let io: Server;

export const initSocketServer = (httpServer: HttpServer) => {
  // Initialize Socket.IO server
  io = new Server(httpServer, {
    cors: {
      origin: "http://localhost:5173/", // Replace with your client URL
      methods: ["GET", "POST"],
    },
  });

  // Handle socket connection
  io.on("connection", (socket: Socket) => {
    console.log(`New client connected: ${socket.id}`);

    // For saving the socket ID of the user
    socket.on("user_connected", (userId: string) => {
      if (!userSocketMap.has(userId)) {
        userSocketMap.set(userId, new Set());
      }

      userSocketMap.get(userId)?.add(socket.id);
      console.log(`User ${userId} is connected with socket ID: ${socket.id}`);
    });

    // Handle socket disconnection
    socket.on("disconnect", () => {
      console.log(`Client disconnected: ${socket.id}`);
      for (const [userId, socketIds] of userSocketMap.entries()) {
        if (socketIds.has(socket.id)) {
          socketIds.delete(socket.id);
          console.log(`Socket ID ${socket.id} removed for user ${userId}`);
          if (socketIds.size === 0) {
            userSocketMap.delete(userId); // Clean up the map if no sockets are left for the user
          }
          break;
        }
      }
    });

    // You can add more custom events here if needed, like message handling, notifications, etc.
  });

  return io;
};

// Export the io instance for use in other parts of the application
export { io };
