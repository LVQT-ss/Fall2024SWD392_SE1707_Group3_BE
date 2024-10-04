import express from 'express';
import { createPond , getAllPonds,  updatePond , deletePond} from '../controller/pond.controller.js';
import { verifyToken } from '../middleware/verifyUser.js';

const router = express.Router();

/**
 * @swagger
 * /api/pond/createPond:
 *   post:
 *     tags:
 *     - Pond Controller
 *     summary: Create a new pond
 *     description: This endpoint allows creating a new pond. The userId is automatically assigned from the JWT token.
 *     security:
 *       - Authorization: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - pondName
 *               - pondSize
 *               - pondDepth
 *               - pondVolume
 *               - pondDrains
 *               - pondAeroCapacity
 *             properties:
 *               pondName:
 *                 type: string
 *                 example: "Koi Paradise"
 *               pondImage:
 *                 type: string
 *                 example: "https://example.com/pond-image.jpg"
 *               pondSize:
 *                 type: number
 *                 format: float
 *                 example: 100.5
 *               pondDepth:
 *                 type: number
 *                 format: float
 *                 example: 2.5
 *               pondVolume:
 *                 type: number
 *                 format: float
 *                 example: 251.25
 *               pondDrains:
 *                 type: integer
 *                 example: 2
 *               pondAeroCapacity:
 *                 type: number
 *                 format: float
 *                 example: 50.0
 *     responses:
 *       201:
 *         description: Pond created successfully
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
 *                   example: "Pond created successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     pondId:
 *                       type: integer
 *                     userId:
 *                       type: integer
 *                     pondName:
 *                       type: string
 *                     pondImage:
 *                       type: string
 *                     pondSize:
 *                       type: number
 *                     pondDepth:
 *                       type: number
 *                     pondVolume:
 *                       type: number
 *                     pondDrains:
 *                       type: integer
 *                     pondAeroCapacity:
 *                       type: number
 *       400:
 *         description: Bad Request - Missing or invalid input
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       500:
 *         description: Server error
 */
router.post('/createPond', verifyToken, createPond);

/**
 * @swagger
 * /api/pond/getAllPonds:
 *   get:
 *     tags:
 *     - Pond Controller
 *     summary: Get all ponds for the authenticated user
 *     security:
 *       - Authorization: []
 *     responses:
 *       200:
 *         description: List of ponds retrieved successfully
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       500:
 *         description: Server error
 */
router.get('/getAllPonds', verifyToken, getAllPonds);

/**
 * @swagger
 * /api/pond/updatePond/{id}:
 *   put:
 *     tags:
 *     - Pond Controller
 *     summary: Update an existing pond
 *     security:
 *       - Authorization: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the pond to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               pondName:
 *                 type: string
 *               pondImage:
 *                 type: string
 *               pondSize:
 *                 type: number
 *               pondDepth:
 *                 type: number
 *               pondVolume:
 *                 type: number
 *               pondDrains:
 *                 type: integer
 *               pondAeroCapacity:
 *                 type: number
 *     responses:
 *       200:
 *         description: Pond updated successfully
 *       400:
 *         description: Bad Request - Invalid input
 *       404:
 *         description: Pond not found
 *       500:
 *         description: Server error
 */
router.put('/updatePond/:id', verifyToken, updatePond);

/**
 * @swagger
 * /api/pond/deletePond/{id}:
 *   delete:
 *     tags:
 *     - Pond Controller
 *     summary: Delete an existing pond
 *     security:
 *       - Authorization: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the pond to delete
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Pond deleted successfully
 *       404:
 *         description: Pond not found
 *       500:
 *         description: Server error
 */
router.delete('/deletePond/:id', verifyToken, deletePond);



export default router;