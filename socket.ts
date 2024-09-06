import { Server as HttpServer } from "http";
import { Server, Socket } from "socket.io";
import { OrderModel } from "./models/orderModel";

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
    //
    socket.on("accept_order", async (orderId: string) => {
      //Update the order status in the database
      console.log(orderId);
      const updateOrder = await OrderModel.findByIdAndUpdate(
        orderId,
        { status: "payment-awaited" },
        { new: true }
      );
      if (updateOrder) {
        console.log("Order Updated");
        //Emit the event to the user and vendor
        const userSocketIds = userSocketMap.get(updateOrder.user.toString());
        if (userSocketIds) {
          userSocketIds.forEach((socketId) => {
            io.to(socketId).emit("order_updated", updateOrder);
          });
        }
        const vendorSocketIds = userSocketMap.get(updateOrder.vendor.toString());
        if (vendorSocketIds) {
          vendorSocketIds.forEach((socketId) => {
            io.to(socketId).emit("order_updated", updateOrder);
          });
        }
        
      }
    });
  });

  return io;
};

// Export the io instance for use in other parts of the application
export { io };
