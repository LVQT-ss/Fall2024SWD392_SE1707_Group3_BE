import express from 'express';
import {
  createWaterPara,
  getAllWaterParas,
  getWaterParaByPondId,
  updateWaterPara,
  deleteWaterPara,
  getAllWaterParaRecordByPondId,
} from '../controller/waterPara.controller.js';
import { verifyToken } from '../middleware/verifyUser.js';

const router = express.Router();

/**
 * @swagger
 * /api/waterPara/createWaterParameter:
 *   post:
 *     tags:
 *     - Water Parameter Controller
 *     summary: Create a new water parameter
 *     security:
 *       - Authorization: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - pondId
 *               - temperature
 *               - pondSaltLevel
 *               - pondPHLevel
 *               - pondOxygenLevel
 *               - pondNitrite
 *               - pondNitrate
 *               - pondPhosphate
 *             properties:
 *               pondId:
 *                 type: integer
 *                 example: 1
 *               temperature:
 *                 type: number
 *                 format: float
 *                 example: 25.5
 *               pondSaltLevel:
 *                 type: number
 *                 format: float
 *                 example: 0.1
 *               pondPHLevel:
 *                 type: number
 *                 format: float
 *                 example: 7.5
 *               pondOxygenLevel:
 *                 type: number
 *                 format: float
 *                 example: 5.0
 *               pondNitrite:
 *                 type: number
 *                 format: float
 *                 example: 0.05
 *               pondNitrate:
 *                 type: number
 *                 format: float
 *                 example: 10.0
 *               pondPhosphate:
 *                 type: number
 *                 format: float
 *                 example: 0.1
 *     responses:
 *       201:
 *         description: Water parameter created successfully
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
 *                   example: "Water Parameter created successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     pondId:
 *                       type: integer
 *                     temperature:
 *                       type: number
 *                     pondSaltLevel:
 *                       type: number
 *                     pondPHLevel:
 *                       type: number
 *                     pondOxygenLevel:
 *                       type: number
 *                     pondNitrite:
 *                       type: number
 *                     pondNitrate:
 *                       type: number
 *                     pondPhosphate:
 *                       type: number
 *       400:
 *         description: Bad Request - Missing or invalid input
 *       404:
 *         description: Pond not found
 *       500:
 *         description: Server error
 */
router.post('/createWaterParameter', verifyToken, createWaterPara);

/**
 * @swagger
 * /api/waterPara/getAllWaterParameter:
 *   get:
 *     tags:
 *     - Water Parameter Controller
 *     summary: Get all water parameters
 *     security:
 *       - Authorization: []
 *     responses:
 *       200:
 *         description: List of water parameters retrieved successfully
 *       500:
 *         description: Server error
 */
router.get('/getAllWaterParameter', verifyToken, getAllWaterParas);

/**
 * @swagger
 * /api/waterPara/pond/{pondId}:
 *   get:
 *     tags:
 *     - Water Parameter Controller
 *     summary: Get water parameters by pond ID
 *     parameters:
 *       - in: path
 *         name: pondId
 *         required: true
 *         description: ID of the pond
 *         schema:
 *           type: integer
 *     security:
 *       - Authorization: []
 *     responses:
 *       200:
 *         description: Water parameters retrieved successfully
 *       404:
 *         description: No water parameters found for this pond
 *       500:
 *         description: Server error
 */
router.get('/pond/:pondId', verifyToken, getWaterParaByPondId);

/**
 * @swagger
 * /api/waterPara/pond/{pondId}/all:
 *   get:
 *     tags:
 *     - Water Parameter Controller
 *     summary: Get all water parameters by pond ID ordered by record date descending
 *     parameters:
 *       - in: path
 *         name: pondId
 *         required: true
 *         description: ID of the pond
 *         schema:
 *           type: integer
 *     security:
 *       - Authorization: []
 *     responses:
 *       200:
 *         description: List of water parameters retrieved successfully, ordered by record date descending
 *       404:
 *         description: No water parameters found for this pond
 *       500:
 *         description: Server error
 */
router.get('/pond/:pondId/all', verifyToken, getAllWaterParaRecordByPondId);

/**
 * @swagger
 * /api/waterPara/updateWaterParameter/{id}:
 *   put:
 *     tags:
 *     - Water Parameter Controller
 *     summary: Update a water parameter
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the water parameter to update
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
 *               temperature:
 *                 type: number
 *                 format: float
 *               pondSaltLevel:
 *                 type: number
 *                 format: float
 *               pondPHLevel:
 *                 type: number
 *                 format: float
 *               pondOxygenLevel:
 *                 type: number
 *                 format: float
 *               pondNitrite:
 *                 type: number
 *                 format: float
 *               pondNitrate:
 *                 type: number
 *                 format: float
 *               pondPhosphate:
 *                 type: number
 *                 format: float
 *     responses:
 *       200:
 *         description: Water parameter updated successfully
 *       400:
 *         description: Bad Request - Invalid input
 *       404:
 *         description: Water Parameter not found
 *       500:
 *         description: Server error
 */
router.put('/updateWaterParameter/:id', verifyToken, updateWaterPara);

/**
 * @swagger
 * /api/waterPara/deleteWaterPara/{id}:
 *   delete:
 *     tags:
 *     - Water Parameter Controller
 *     summary: Delete a water parameter
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the water parameter to delete
 *         schema:
 *           type: integer
 *     security:
 *       - Authorization: []
 *     responses:
 *       200:
 *         description: Water parameter deleted successfully
 *       404:
 *         description: Water Parameter not found
 *       500:
 *         description: Server error
 */
router.delete('/deleteWaterPara/:id', verifyToken, deleteWaterPara);

export default router;