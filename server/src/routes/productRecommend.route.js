import express from 'express';
import { 
  createProductRecommend, 
  getAllProductRecommends, 
  getProductRecommendById, 
  updateProductRecommend, 
  deleteProductRecommend 
} from '../controller/productRecommend.controller.js';
import { verifyToken } from '../middleware/verifyUser.js';

const router = express.Router();

/**
 * @swagger
 * /api/productRecommends/createProductRecommend:
 *   post:
 *     tags:
 *       - ProductRecommend
 *     summary: Create a new product recommendation
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
 *               - waterParameterId
 *             properties:
 *               productId:
 *                 type: integer
 *               waterParameterId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Recommendation created successfully
 *       400:
 *         description: Bad request, missing fields
 *       500:
 *         description: Server error
 */
router.post('/createProductRecommend', verifyToken, createProductRecommend);

/**
 * @swagger
 * /api/productRecommends/getAllProductRecommends:
 *   get:
 *     tags:
 *       - ProductRecommend
 *     summary: Get all product recommendations
 *     security:
 *       - Authorization: []
 *     responses:
 *       200:
 *         description: List of product recommendations
 *       500:
 *         description: Server error
 */
router.get('/getAllProductRecommends', verifyToken, getAllProductRecommends);

/**
 * @swagger
 * /api/productRecommends/getProductRecommendById/{recommendId}:
 *   get:
 *     tags:
 *       - ProductRecommend
 *     summary: Get a product recommendation by ID
 *     parameters:
 *       - in: path
 *         name: recommendId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the product recommendation to retrieve
 *     security:
 *       - Authorization: []
 *     responses:
 *       200:
 *         description: Recommendation retrieved successfully
 *       404:
 *         description: Recommendation not found
 *       500:
 *         description: Server error
 */
router.get('/getProductRecommendById/:recommendId', verifyToken, getProductRecommendById);

/**
 * @swagger
 * /api/productRecommends/updateProductRecommend/{recommendId}:
 *   put:
 *     tags:
 *       - ProductRecommend
 *     summary: Update a product recommendation by ID
 *     parameters:
 *       - in: path
 *         name: recommendId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the product recommendation to update
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
 *               waterParameterId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Recommendation updated successfully
 *       404:
 *         description: Recommendation not found
 *       500:
 *         description: Server error
 */
router.put('/updateProductRecommend/:recommendId', verifyToken, updateProductRecommend);

/**
 * @swagger
 * /api/productRecommends/deleteProductRecommend/{recommendId}:
 *   delete:
 *     tags:
 *       - ProductRecommend
 *     summary: Delete a product recommendation by ID
 *     parameters:
 *       - in: path
 *         name: recommendId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the product recommendation to delete
 *     security:
 *       - Authorization: []
 *     responses:
 *       200:
 *         description: Recommendation deleted successfully
 *       404:
 *         description: Recommendation not found
 *       500:
 *         description: Server error
 */
router.delete('/deleteProductRecommend/:recommendId', verifyToken, deleteProductRecommend);

export default router;
