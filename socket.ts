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
      origin: "http://localhost:5173/",
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
            io.to(socketId).emit("initiate_payment", {
              orderId: updateOrder._id,
              amount: updateOrder.total,
              currency: "INR",
            });
          });
        }
        const vendorSocketIds = userSocketMap.get(
          updateOrder.vendor.toString()
        );
        if (vendorSocketIds) {
          vendorSocketIds.forEach((socketId) => {
            io.to(socketId).emit("order_updated", updateOrder);
          });
        }
      }
    });
    //Trying here so that We can remove the order
    socket.on("decline_order", async (orderId: string) => {
      try {
        // Update the order status to "cancelled"
        const updateOrder = await OrderModel.findByIdAndUpdate(
          orderId,
          { status: "cancelled" },
          { new: true }
        );
    
        if (updateOrder) {
          console.log("Order Declined");
    
          // Notify the user about the cancelled order
          const userSocketIds = userSocketMap.get(updateOrder.user.toString());
          if (userSocketIds) {
            userSocketIds.forEach((socketId) => {
              io.to(socketId).emit("order_cancelled", {
                orderId: updateOrder._id,
                status: "cancelled",
              }); 
            });
          }
    
          // Notify the vendor about the cancelled order
          const vendorSocketIds = userSocketMap.get(updateOrder.vendor.toString());
          if (vendorSocketIds) {
            vendorSocketIds.forEach((socketId) => {
              io.to(socketId).emit("order_cancelled", updateOrder);
            });
          }
        } else {
          console.error("Order not found or could not be updated");
        }
      } catch (error) {
        console.error("Error declining the order:", error);
      }
    });
    

    socket.on("payment_confirmed", async (data: { orderId: string }) => {
      const { orderId } = data;
      const updateOrder = await OrderModel.findByIdAndUpdate(
        orderId,
        { status: "processing" },
        { new: true }
      );
      if (updateOrder) {
        console.log("Payment for Order Confirmed", orderId);
        //Notify the user about payment confirmation
        const userSocketIds = userSocketMap.get(updateOrder.user.toString());
        if (userSocketIds) {
          userSocketIds.forEach((socketId) => {
            io.to(socketId).emit("payment_status_updated", {
              orderId: updateOrder._id,
              status: "Payment Confirmed",
            });
          });
        }

        //Notify the vendor about payment confirmation
        const vendorSocketIds = userSocketMap.get(
          updateOrder.vendor.toString()
        );
        if (vendorSocketIds) {
          vendorSocketIds.forEach((socketId) => {
            io.to(socketId).emit("order_confirmed", updateOrder);
          });
        }
      }
    });
  });

  return io;
};

// Export the io instance for use in other parts of the application
export { io };
