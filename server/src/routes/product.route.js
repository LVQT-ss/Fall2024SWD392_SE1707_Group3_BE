import express from 'express';
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from '../controller/product.controller.js';
import { verifyToken } from '../middleware/verifyUser.js';

const router = express.Router();

/**
 * @swagger
 * /api/products/createProduct:
 *   post:
 *     tags:
 *     - Products
 *     summary: Create a new product
 *     security:
 *       - Authorization: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - productName
 *               - productDescription
 *               - productPrice
 *               - inStock
 *             properties:
 *               userId:
 *                 type: integer
 *                 example: 1
 *               productName:
 *                 type: string
 *                 example: "Koi Fish Food"
 *               productDescription:
 *                 type: string
 *                 example: "High-quality food for koi fish"
 *               productPrice:
 *                 type: number
 *                 format: float
 *                 example: 20.99
 *               inStock:
 *                 type: integer
 *                 example: 100
 *     responses:
 *       201:
 *         description: Product created successfully
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
 *                   example: "Product created successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     productId:
 *                       type: integer
 *                     userId:
 *                       type: integer
 *                     productName:
 *                       type: string
 *                     productDescription:
 *                       type: string
 *                     productPrice:
 *                       type: number
 *                     inStock:
 *                       type: integer
 *       400:
 *         description: Bad Request - Missing or invalid input
 *       500:
 *         description: Server error
 */
router.post('/createProduct', verifyToken, createProduct);

/**
 * @swagger
 * /api/products/getAllProducts:
 *   get:
 *     tags:
 *     - Products
 *     summary: Get all products
 *     security:
 *       - Authorization: []
 *     responses:
 *       200:
 *         description: List of products retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       500:
 *         description: Server error
 */
router.get('/getAllProducts', verifyToken, getAllProducts);

/**
 * @swagger
 * /api/products/getProductById/{productId}:
 *   get:
 *     tags:
 *     - Products
 *     summary: Get a product by ID
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         description: ID of the product
 *         schema:
 *           type: integer
 *     security:
 *       - Authorization: []
 *     responses:
 *       200:
 *         description: Product retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 *       500:
 *         description: Server error
 */
router.get('/getProductById/:productId', verifyToken, getProductById);

/**
 * @swagger
 * /api/products/updateProduct/{productId}:
 *   put:
 *     tags:
 *     - Products
 *     summary: Update a product by ID
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         description: ID of the product to update
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
 *               productName:
 *                 type: string
 *               productDescription:
 *                 type: string
 *               productPrice:
 *                 type: number
 *                 format: float
 *               inStock:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       400:
 *         description: Bad Request - Invalid input
 *       404:
 *         description: Product not found
 *       500:
 *         description: Server error
 */
router.put('/updateProduct/:productId', verifyToken, updateProduct);

/**
 * @swagger
 * /api/products/deleteProduct/{productId}:
 *   delete:
 *     tags:
 *     - Products
 *     summary: Delete a product by ID
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         description: ID of the product to delete
 *         schema:
 *           type: integer
 *     security:
 *       - Authorization: []
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       404:
 *         description: Product not found
 *       500:
 *         description: Server error
 */
router.delete('/deleteProduct/:productId', verifyToken, deleteProduct);

export default router;
