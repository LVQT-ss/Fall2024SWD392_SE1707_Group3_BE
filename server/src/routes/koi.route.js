import express from 'express';
import { addKoi, getAllKoi } from '../controller/Koifish.controller.js';
import { verifyToken } from '../middleware/verifyUser.js';

const router = express.Router();


/**
 * @swagger
 * /api/koi/addKoi:
 *   post:
 *     tags:
 *     - Koi Fish Controller
 *     summary: Add a new Koi fish
 *     description: This endpoint allows adding a new Koi fish to a specific pond.
 *     security:
 *       - Authorization: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - koiName
 *               - currentPondId
 *             properties:
 *               koiName:
 *                 type: string
 *                 example: "Golden Dragon"
 *               koiImage:
 *                 type: string
 *                 example: "https://example.com/koi-image.jpg"
 *               koiGender:
 *                 type: string
 *                 example: "Male"
 *               koiBreed:
 *                 type: integer
 *                 example: 1
 *               koiOrigin:
 *                 type: number
 *                 format: float
 *                 example: 12.5
 *               price:
 *                 type: number
 *                 format: float
 *                 example: 100.00
 *               currentPondId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Koi fish added successfully
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
 *                   example: "Koi fish added successfully"
 *                 data:
 *                   $ref: '#/components/schemas/KoiFish'
 *       400:
 *         description: Bad Request - Missing or invalid input
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       500:
 *         description: Server error
 * 
 * components:
 *   schemas:
 *     KoiFish:
 *       type: object
 *       properties:
 *         fishId:
 *           type: integer
 *         koiName:
 *           type: string
 *         koiImage:
 *           type: string
 *         koiGender:
 *           type: string
 *         koiBreed:
 *           type: integer
 *         koiOrigin:
 *           type: number
 *         price:
 *           type: number
 *         currentPondId:
 *           type: integer
 */
router.post('/addKoi', verifyToken, addKoi);

/**
 * @swagger
 * /api/koi/getAllKoi:
 *   get:
 *     tags:
 *       - Koi Fish Controller
 *     summary: Retrieve all koi
 *     responses:
 *       200:
 *         description: Successfully retrieved koi fish
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/KoiFish'
 *       500:
 *         description: Server error
 */
router.get('/getAllKoi', verifyToken, getAllKoi);


export default router;