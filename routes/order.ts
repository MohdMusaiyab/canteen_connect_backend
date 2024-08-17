import Express from "express";
import {
  acceptOrderController,
  createOrderController,
  rejectOrderController,
} from "../controllers/order";
import authenticateUser from "../middlewares/isSign";
import { isAdmin } from "../middlewares/isAdmin";
const orderRoutes = Express.Router();

// ==============================+Check it and then make the other ones=====================
/**
 * @swagger
 * /order/create-order:
 *   post:
 *     summary: Create a new order
 *     description: Creates a new order for the user and generates an OTP. Notifies the admin for acceptance or rejection.
 *     tags:
 *       - Orders
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user
 *               - vendor
 *               - total
 *               - cart
 *             properties:
 *               user:
 *                 type: string
 *                 description: The ID of the user placing the order
 *                 example: "60c72b2f4f1a2c1a0c8b4567"
 *               vendor:
 *                 type: string
 *                 description: The ID of the vendor receiving the order
 *                 example: "60c72b2f4f1a2c1a0c8b4568"
 *               total:
 *                 type: number
 *                 description: The total price of the order
 *                 example: 150.00
 *               cart:
 *                 type: string
 *                 description: The ID of the cart associated with the order
 *                 example: "60c72b2f4f1a2c1a0c8b4569"
 *     responses:
 *       201:
 *         description: Order created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Order created
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 otp:
 *                   type: number
 *                   example: 1234
 *       400:
 *         description: Bad request - Invalid ID format or entity not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid ID format
 *                 success:
 *                   type: boolean
 *                   example: false
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal server error
 *                 success:
 *                   type: boolean
 *                   example: false
 */
orderRoutes.post("/create-order", authenticateUser, createOrderController);

// ===========Now for Accepting the Order================

/**
 * @swagger
 * order/accept-order/{id}:
 *   patch:
 *     summary: Accept an order
 *     description: Changes the status of an order to "accepted". Requires admin authentication.
 *     tags:
 *       - Orders
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the order to accept.
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       '200':
 *         description: Order successfully accepted.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Order accepted
 *                 success:
 *                   type: boolean
 *                   example: true
 *       '400':
 *         description: Invalid ID format or order not found or already accepted.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid ID format
 *                 success:
 *                   type: boolean
 *                   example: false
 *       '500':
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal server error
 *                 success:
 *                   type: boolean
 *                   example: false
 */

orderRoutes.patch(
  "/accept-order/:id",
  authenticateUser,
  isAdmin,
  acceptOrderController
);

// ==================For Rejecting the order==================

/**
 * @swagger
 * cancel/reject-order/{id}:
 *   patch:
 *     summary: Reject an order
 *     description: Changes the status of an order to "cancelled". Requires admin authentication.
 *     tags:
 *       - Orders
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the order to reject.
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       '200':
 *         description: Order successfully rejected.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Order rejected
 *                 success:
 *                   type: boolean
 *                   example: true
 *       '400':
 *         description: Invalid ID format or order not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid ID format
 *                 success:
 *                   type: boolean
 *                   example: false
 *       '500':
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal server error
 *                 success:
 *                   type: boolean
 *                   example: false
 */

orderRoutes.patch(
  "/cancel-order/:id",
  authenticateUser,
  isAdmin,
  rejectOrderController
);
export default orderRoutes;
