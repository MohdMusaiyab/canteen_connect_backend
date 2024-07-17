import express from "express";
import { addProductController, deleteProductController } from "../controllers/cart";
import authenticateUser from "../middlewares/isSign";

const cartRoutes = express.Router();

cartRoutes.get("/", (req, res) => {
  res.send("Hello from Cart router");
});
// Need more things
/**
 * @swagger
 * /cart/add-product:
 *   post:
 *     summary: Add a product to the cart
 *     tags:
 *       - Cart
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 example: "60c72b2f9b1e8e001c8e4ad7"
 *               productId:
 *                 type: string
 *                 example: "60c72b2f9b1e8e001c8e4ad8"
 *     responses:
 *       200:
 *         description: Product added to the cart
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Product Added to the Cart
 *                 cart:
 *                   type: object
 *                   properties:
 *                     user:
 *                       type: string
 *                       example: "60c72b2f9b1e8e001c8e4ad7"
 *                     products:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           product:
 *                             type: string
 *                             example: "60c72b2f9b1e8e001c8e4ad8"
 *                           quantity:
 *                             type: number
 *                             example: 1
 *                     total:
 *                       type: number
 *                       example: 9.99
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: Bad Request
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: Unauthorized
 *       404:
 *         description: Product not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Product not found
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: Internal Server Error
 */

cartRoutes.post("/add-product",authenticateUser,addProductController);
// ============Deleting/Removing the Product from the Cart================
cartRoutes.delete("/delete-product", authenticateUser, deleteProductController)

export default cartRoutes;
