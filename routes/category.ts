import Express from "express";
import {
  createCategoryController,
  updateCategoryController,
  deleteCategoryController,
  getVendorCategoriesController,
} from "../controllers/category";
import { isAdmin } from "../middlewares/isAdmin";
import authenticateUser from "../middlewares/isSign";

const categoryRoutes = Express.Router();

categoryRoutes.get("/", (req, res) => {
  res.send("Hello from Category router");
});
/**
 * @swagger
 * /category/create-category/{id}:
 *   post:
 *     summary: Create a new category
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Categories
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The vendor ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the category
 *                 example: "Paties"
 *               description:
 *                 type: string
 *                 description: The description of the category
 *                 example: "All kinds of Veg Paties"
 *     responses:
 *       201:
 *         description: Category created successfully
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
 *                   example: "Category created successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "60c72b2f9b1d8c001c8e4b3d"
 *                     name:
 *                       type: string
 *                       example: "Paties"
 *                     description:
 *                       type: string
 *                       example: "All kinds of Veg Paties"
 *                     vendor:
 *                       type: string
 *                       example: "60c72b2f9b1d8c001c8e4b3d"
 *       400:
 *         description: Validation errors
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       path:
 *                         type: array
 *                         items:
 *                           type: string
 *                       message:
 *                         type: string
 *                   example: [{ "path": ["name"], "message": "String must contain at least 2 character(s)" }]
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
categoryRoutes.post(
  "/create-category/:id",
  authenticateUser,
  isAdmin,
  createCategoryController
);
// =====Check Update Category Controller================

/**
 * @swagger
 * /category/update-category/{id}:
 *   put:
 *     summary: Update an existing category
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Categories
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The category ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the category
 *                 example: "Updated Paties"
 *               description:
 *                 type: string
 *                 description: The description of the category
 *                 example: "Updated description for Veg Paties"
 *     responses:
 *       200:
 *         description: Category updated successfully
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
 *                   example: "Category updated successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "60c72b2f9b1d8c001c8e4b3d"
 *                     name:
 *                       type: string
 *                       example: "Updated Paties"
 *                     description:
 *                       type: string
 *                       example: "Updated description for Veg Paties"
 *                     vendor:
 *                       type: string
 *                       example: "60c72b2f9b1d8c001c8e4b3d"
 *       400:
 *         description: Validation errors
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       path:
 *                         type: array
 *                         items:
 *                           type: string
 *                       message:
 *                         type: string
 *                   example: [{ "path": ["name"], "message": "String must contain at least 2 character(s)" }]
 *       404:
 *         description: Category not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Category not found"
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
 *                 error:
 *                   type: string
 *                   example: "Internal Server Error"
 *                 success:
 *                   type: boolean
 *                   example: false
 */
categoryRoutes.put(
  "/update-category/:id",
  authenticateUser,
  isAdmin,
  updateCategoryController
);

/**
 * @swagger
 * /category/delete-category/{id}:
 *   delete:
 *     summary: Delete an existing category
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Categories
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The category ID
 *     responses:
 *       200:
 *         description: Category deleted successfully
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
 *                   example: "Category deleted successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "60c72b2f9b1d8c001c8e4b3d"
 *                     name:
 *                       type: string
 *                       example: "Paties"
 *                     description:
 *                       type: string
 *                       example: "All kinds of Veg Paties items"
 *                     vendor:
 *                       type: string
 *                       example: "60c72b2f9b1d8c001c8e4b3d"
 *       404:
 *         description: Category not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Category not found"
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
 *                 error:
 *                   type: string
 *                   example: "Internal Server Error"
 *                 success:
 *                   type: boolean
 *                   example: false
 */
categoryRoutes.delete(
  "/delete-category/:id",
  authenticateUser,
  isAdmin,
  deleteCategoryController
);

/**
 * @swagger
 * /category/get-vendor-categories/{id}:
 *   get:
 *     summary: Get categories by vendor ID
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Categories
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The vendor ID
 *     responses:
 *       200:
 *         description: Categories fetched successfully
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
 *                   example: "Categories fetched successfully"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "60c72b2f9b1d8c001c8e4b3d"
 *                       name:
 *                         type: string
 *                         example: "Paties"
 *                       description:
 *                         type: string
 *                         example: "All kinds of Veg Paties"
 *                       vendor:
 *                         type: string
 *                         example: "60c72b2f9b1d8c001c8e4b3d"
 *       404:
 *         description: Categories not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Categories not found"
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
categoryRoutes.get(
  "/get-vendor-categories/:id",
  authenticateUser,
  getVendorCategoriesController
);

export default categoryRoutes;
