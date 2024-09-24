import express from "express";
import {
  addProductController,
  getUserCartController,
  removeProductController,
} from "../controllers/cart";
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
 *               quantity:
 *                 type: number
 *                 example: 1
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

cartRoutes.post("/add-product", authenticateUser, addProductController);
// ============Deleting/Removing the Product from the Cart================

/**
 * @swagger
 * /cart/remove-product:
 *   delete:
 *     summary: Remove a product from the cart
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
 *         description: Product removed from the cart
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
 *                   example: Product removed from the Cart
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
 *         description: Cart or product not found
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
 *                   example: No cart found for the user or Product not found in the cart
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
 * */
cartRoutes.delete("/remove-product", authenticateUser, removeProductController);

// ===========For Getting the Cart of the User================

/**
 * @swagger
 * /cart/user-cart/{id}:
 *   get:
 *     summary: Get the user's cart by user ID
 *     tags:
 *       - Cart
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Cart retrieved successfully
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
 *                   example: Cart retrieved successfully
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
 *         description: Invalid User ID
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
 *                   example: "User ID is required or Invalid User Id format"
 *       401:
 *         description: Unauthorized access
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
 *                   example: Unauthorized access
 *       404:
 *         description: Cart not found
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
 *                   example: Cart not found
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

cartRoutes.get("/user-cart/:id", authenticateUser, getUserCartController);

export default cartRoutes;
