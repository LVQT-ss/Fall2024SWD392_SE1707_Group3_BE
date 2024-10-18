import express from 'express';
import {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from '../controller/category.controller.js';
import { verifyToken } from '../middleware/verifyUser.js'; // Middleware để kiểm tra token

const router = express.Router();

/**
 * @swagger
 * /api/categories/createCategory:
 *   post:
 *     tags:
 *     - Categories
 *     summary: Create a new category
 *     security:
 *       - Authorization: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productId
 *               - categoryName
 *             properties:
 *               productId:
 *                 type: integer
 *                 example: 1
 *               categoryName:
 *                 type: string
 *                 example: "Food"
 *               categoryType:
 *                 type: string
 *                 example: "Premium"
 *     responses:
 *       201:
 *         description: Category created successfully
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Server error
 */
router.post('/createCategory', verifyToken, createCategory);

/**
 * @swagger
 * /api/categories/getAllCategories:
 *   get:
 *     tags:
 *     - Categories
 *     summary: Get all categories
 *     security:
 *       - Authorization: []
 *     responses:
 *       200:
 *         description: List of categories retrieved successfully
 *       500:
 *         description: Server error
 */
router.get('/getAllCategories', verifyToken, getAllCategories);

/**
 * @swagger
 * /api/categories/getCategoryById/{categoryId}:
 *   get:
 *     tags:
 *     - Categories
 *     summary: Get a category by ID
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         schema:
 *           type: integer
 *     security:
 *       - Authorization: []
 *     responses:
 *       200:
 *         description: Category retrieved successfully
 *       404:
 *         description: Category not found
 *       500:
 *         description: Server error
 */
router.get('/getCategoryById/:categoryId', verifyToken, getCategoryById);

/**
 * @swagger
 * /api/categories/updateCategory/{categoryId}:
 *   put:
 *     tags:
 *     - Categories
 *     summary: Update a category by ID
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         schema:
 *           type: integer
 *     security:
 *       - Authorization: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: integer
 *               categoryName:
 *                 type: string
 *               categoryType:
 *                 type: string
 *     responses:
 *       200:
 *         description: Category updated successfully
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Category not found
 *       500:
 *         description: Server error
 */
router.put('/updateCategory/:categoryId', verifyToken, updateCategory);

/**
 * @swagger
 * /api/categories/deleteCategory/{categoryId}:
 *   delete:
 *     tags:
 *     - Categories
 *     summary: Delete a category by ID
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         schema:
 *           type: integer
 *     security:
 *       - Authorization: []
 *     responses:
 *       200:
 *         description: Category deleted successfully
 *       404:
 *         description: Category not found
 *       500:
 *         description: Server error
 */
router.delete('/deleteCategory/:categoryId', verifyToken, deleteCategory);

export default router;
