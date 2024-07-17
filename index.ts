import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import cors from "cors";
import { dbConnect } from "./config/dbConnect";
import rootRoutes from "./routes";
// =====================For Documentation=========================
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerOptions from "./swagger";
dotenv.config();

const app = express();
// New Code//
const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

//Serve Swagger API Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// ============For Routing================
app.use("/api/v1", rootRoutes);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
const main = async () => {
  await dbConnect();
};
main();


