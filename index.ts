import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import cors from "cors";
import { dbConnect } from "./config/dbConnect";
import rootRoutes from "./routes";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerOptions from "./swagger";
import http from "http";
import { initSocket } from "./socket";

// Initialize environment variables
dotenv.config();

const app = express();

// Create HTTP server from Express app
const server = http.createServer(app);

// Initialize Socket.IO server and attach to HTTP server
initSocket(server); // Ensure this initializes properly

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Middleware setup
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

// Serve Swagger API Documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routing setup
app.use("/api/v1", rootRoutes);

// Start the HTTP server (ensure it's `server.listen`, not `app.listen`)
server.listen(3000, () => {
  console.log("Server is running on port 3000");
});

// Database connection
const main = async () => {
  await dbConnect();
};
main();
