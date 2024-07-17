import Express from "express";
import authenticateUser from "../middlewares/isSign";
import { isAdmin } from "../middlewares/isAdmin";
import {
  createProductController,
  deleteProductController,
  getAllProductsController,
  getSingleProductController,
  updateProductInfoController,
} from "../controllers/product";
const productRoutes = Express.Router();

productRoutes.get("/", (req, res) => {
  res.send("Hello from Product router");
});

/**
 * @swagger
 * /product/create-product:
 *   post:
 *     summary: Create a new product
 *     tags:
 *       - Products
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the product
 *                 example: "Cheeseburger"
 *               description:
 *                 type: string
 *                 description: The description of the product
 *                 example: "A delicious cheeseburger with all the fixings"
 *               price:
 *                 type: number
 *                 description: The price of the product
 *                 example: 9.99
 *               category:
 *                 type: string
 *                 description: The category ID of the product
 *                 example: "60c72b2f9b1d8c001c8e4b3d"
 *               cookingTime:
 *                 type: number
 *                 description: The cooking time of the product in minutes
 *                 example: 15
 *               photo:
 *                 type: string
 *                 description: The URL of the product photo
 *                 example: "https://example.com/photo.jpg"
 *               quantity:
 *                 type: number
 *                 description: The quantity of the product available
 *                 example: 50
 *               
 *     responses:
 *       201:
 *         description: New Product Created Successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "New Product Created Successfully"
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       example: "Cheeseburger"
 *                     description:
 *                       type: string
 *                       example: "A delicious cheeseburger with all the fixings"
 *                     price:
 *                       type: number
 *                       example: 9.99
 *                     category:
 *                       type: string
 *                       example: "60c72b2f9b1d8c001c8e4b3d"
 *                     cookingTime:
 *                       type: number
 *                       example: 15
 *                     vendor:
 *                       type: string
 *                       example: "60c72b2f9b1d8c001c8e4b3d"
 *                     photo:
 *                       type: string
 *                       example: "https://example.com/photo.jpg"
 *                     quantity:
 *                       type: number
 *                       example: 50
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Product already exists"
 *                 success:
 *                   type: boolean
 *                   example: false
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal Server Error"
 *                 success:
 *                   type: boolean
 *                   example: false
 */
productRoutes.post(
  "/create-product",
  authenticateUser,
  isAdmin,
  createProductController
);

/**
 * @swagger
 * /product/update-product/{id}:
 *   put:
 *     summary: Update an existing product
 *     tags:
 *       - Products
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The product ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the product
 *                 example: "Cheeseburger"
 *               description:
 *                 type: string
 *                 description: The description of the product
 *                 example: "A delicious cheeseburger"
 *               price:
 *                 type: number
 *                 description: The price of the product
 *                 example: 5.99
 *               category:
 *                 type: string
 *                 description: The category ID of the product
 *                 example: "60c72b2f9b1d8c001c8e4b3d"
 *               cookingTime:
 *                 type: number
 *                 description: The cooking time of the product in minutes
 *                 example: 15
 *               photo:
 *                 type: string
 *                 description: The URL of the product photo
 *                 example: "http://example.com/photo.jpg"
 *               quantity:
 *                 type: number
 *                 description: The quantity of the product
 *                 example: 10
 *     responses:
 *       200:
 *         description: Product updated successfully
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
 *                   example: "Product updated successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "60c72b2f9b1d8c001c8e4b3d"
 *                     name:
 *                       type: string
 *                       example: "Cheeseburger"
 *                     description:
 *                       type: string
 *                       example: "A delicious cheeseburger"
 *                     price:
 *                       type: number
 *                       example: 5.99
 *                     category:
 *                       type: string
 *                       example: "60c72b2f9b1d8c001c8e4b3d"
 *                     cookingTime:
 *                       type: number
 *                       example: 15
 *                     vendor:
 *                       type: string
 *                       example: "60c72b2f9b1d8c001c8e4b3d"
 *                     photo:
 *                       type: string
 *                       example: "http://example.com/photo.jpg"
 *                     quantity:
 *                       type: number
 *                       example: 10
 *       403:
 *         description: Not authorized to update this product
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "You are not authorized to update this product"
 *                 success:
 *                   type: boolean
 *                   example: false
 *       404:
 *         description: Product not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Product not found"
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
 *                   example: "Internal Server Error"
 *                 success:
 *                   type: boolean
 *                   example: false
 */
productRoutes.put(
  "/update-product/:id",
  authenticateUser,
  isAdmin,
  updateProductInfoController
);
/**
 * @swagger
 * /product/delete-product/{id}:
 *   delete:
 *     summary: Delete an existing product
 *     tags:
 *       - Products
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The product ID
 *     responses:
 *       200:
 *         description: Product deleted successfully
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
 *                   example: Product deleted successfully
 *       400:
 *         description: Product ID is required
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
 *                   example: Product ID is required
 *       403:
 *         description: Not authorized to delete this product
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
 *                   example: You are not authorized to delete this product
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
 *         description: Internal server error
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
 *                   example: Internal Server Error
 */
productRoutes.delete(
  "/delete-product/:id",
  authenticateUser,
  isAdmin,
  deleteProductController
);

// ==================================Needs to be checked=======================================

/**
 * @swagger
 * /product/get-products/{id}:
 *   get:
 *     summary: Get all products for a specific vendor
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The vendor ID
 *     responses:
 *       200:
 *         description: Products found
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
 *                   example: Products Found
 *                 products:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                         example: "Pizza"
 *                       description:
 *                         type: string
 *                         example: "A delicious cheese pizza"
 *                       price:
 *                         type: number
 *                         example: 9.99
 *                       category:
 *                         type: string
 *                         example: "60c72b2f9b1e8e001c8e4ad7"
 *                       cookingTime:
 *                         type: number
 *                         example: 15
 *                       vendor:
 *                         type: string
 *                         example: "60c72b2f9b1e8e001c8e4ad8"
 *                       photo:
 *                         type: string
 *                         nullable: true
 *                         example: "http://example.com/photo.jpg"
 *                       quantity:
 *                         type: number
 *                         example: 10
 *                       isAvailable:
 *                         type: boolean
 *                         nullable: true
 *                         example: true
 *       400:
 *         description: Invalid request or missing parameters
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
 *                   example: Vendor ID is required
 *                 # For illustrative purposes, you can list additional examples separately
 *                 # message2:
 *                 #   type: string
 *                 #   example: Invalid Vendor ID format
 *       404:
 *         description: No products found for the given vendor ID
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
 *                   example: No products found
 *       500:
 *         description: Internal server error
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
 *                   example: An error occurred
 */

productRoutes.get('/get-products/:id', getAllProductsController);


/**
 * @swagger
 * /product/get-single-product/{id}:
 *   get:
 *     summary: Get a single product by ID
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The product ID
 *     responses:
 *       201:
 *         description: Product found
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
 *                   example: Product Found
 *       400:
 *         description: Invalid request or missing parameters
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
 *                   example: Product ID is required or Invalid Product ID format
 *       404:
 *         description: No products found for the given product ID
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
 *                   example: No Products Found
 *       500:
 *         description: Internal server error
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
 *                   example: Internal Server Error
 */
productRoutes.get("/get-single-product/:id", getSingleProductController);


export default productRoutes;
