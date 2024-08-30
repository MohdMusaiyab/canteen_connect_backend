import { Server } from "socket.io";
import { Server as HttpServer } from "http";

let io: Server;

export const initSocket = (server: HttpServer) => {
  io = new Server(server, {
    cors: {
      origin: "http://localhost:3001",  // Your React client URL
      methods: ["GET", "POST"],
      credentials: true,  // Allow cookies and authentication headers
    },
  });

  io.on("connection", (socket) => {
    console.log("New client connected:", socket.id);

    // Listen for order events
    socket.on("order_accepted", (data) => {
      console.log("Order accepted:", data);
      const { userId, orderId } = data;
      // Emit confirmation to the user
      io.to(userId).emit("order_accepted_confirmation", { orderId });
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });
};

export { io };  // Export the Socket.IO instance
