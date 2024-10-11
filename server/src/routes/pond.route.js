import express from 'express';
import { createPond , getAllPondsByUser,  updatePond , deletePond,deletePondByOwner,getAllPonds,getPondById} from '../controller/pond.controller.js';
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
 *               pondCapacityOfKoiFish:
 *                 type: integer
 *                 example: 20               
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
 * /api/pond/getAllPondsByUser:
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
router.get('/getAllPondsByUser', verifyToken, getAllPondsByUser);

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
 *               pondCapacityOfKoiFish:
 *                 type: integer
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
 *     - Admin Controller
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
// New route for owner/admin deletion
/**
 * @swagger
 * /api/pond/deletePondByOwner/{id}:
 *   delete:
 *     tags:
 *     - Pond Controller
 *     summary: Delete a pond (only by owner or admin)
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
 *       403:
 *         description: Unauthorized - User is not the owner or admin
 *       404:
 *         description: Pond not found
 *       500:
 *         description: Server error
 */
router.delete('/deletePondByOwner/:id', verifyToken, deletePondByOwner);

/**
 * @swagger
 * /api/pond/getAllPonds:
 *   get:
 *     tags:
 *       - Admin Controller
 *     summary: Retrieve all Ponds
 *     description: Get a list of all ponds with their details and associated user information
 *     security:
 *       - Authorization: []
 *     responses:
 *       200:
 *         description: Successfully retrieved ponds
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       pondId:
 *                         type: integer
 *                         description: The pond's ID
 *                         example: 1
 *                       pondName:
 *                         type: string
 *                         description: Name of the pond
 *                         example: "Koi Paradise"
 *                       pondImage:
 *                         type: string
 *                         description: URL of the pond image
 *                         example: "https://example.com/pond-image.jpg"
 *                       pondSize:
 *                         type: number
 *                         format: float
 *                         description: Size of the pond
 *                         example: 100.5
 *                       pondDepth:
 *                         type: number
 *                         format: float
 *                         description: Depth of the pond
 *                         example: 2.5
 *                       pondVolume:
 *                         type: number
 *                         format: float
 *                         description: Volume of the pond
 *                         example: 251.25
 *                       pondDrains:
 *                         type: integer
 *                         description: Number of drains in the pond
 *                         example: 2
 *                       pondAeroCapacity:
 *                         type: number
 *                         format: float
 *                         description: Aeration capacity of the pond
 *                         example: 50.0
 *                       userId:
 *                         type: integer
 *                         description: ID of the pond owner
 *                         example: 1
 *                       User:
 *                         type: object
 *                         properties:
 *                           username:
 *                             type: string
 *                             description: Username of the pond owner
 *                             example: "john_doe"
 *                           email:
 *                             type: string
 *                             description: Email of the pond owner
 *                             example: "john@example.com"
 *                           usertype:
 *                             type: string
 *                             description: Type of user
 *                             enum: [Admin, Shop, Staff, Customer]
 *                             example: "Customer"
 *                           userStatus:
 *                             type: string
 *                             description: Status of the user
 *                             example: "Active"
 *       500:
 *         description: Server error
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
 *                   example: "Failed to fetch ponds"
 *                 error:
 *                   type: string
 *                   example: "Internal server error"
 */
router.get('/getAllPonds', verifyToken, getAllPonds);


// Router configuration (add to pond.routes.js)
/**
 * @swagger
 * /api/pond/getPondById/{id}:
 *   get:
 *     tags:
 *       - Pond Controller
 *     summary: Retrieve a specific pond by ID
 *     description: Get detailed information about a specific pond including capacity information
 *     security:
 *       - Authorization: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the pond to retrieve
 *     responses:
 *       200:
 *         description: Successfully retrieved pond
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     pondId:
 *                       type: integer
 *                       example: 1
 *                     pondName:
 *                       type: string
 *                       example: "Koi Paradise"
 *                     pondImage:
 *                       type: string
 *                       example: "https://example.com/pond-image.jpg"
 *                     pondSize:
 *                       type: number
 *                       format: float
 *                       example: 100.5
 *                     pondDepth:
 *                       type: number
 *                       format: float
 *                       example: 2.5
 *                     pondVolume:
 *                       type: number
 *                       format: float
 *                       example: 251.25
 *                     pondDrains:
 *                       type: integer
 *                       example: 2
 *                     pondAeroCapacity:
 *                       type: number
 *                       format: float
 *                       example: 50.0
 *                     maxCapacity:
 *                       type: integer
 *                       example: 25
 *                     remainingCapacity:
 *                       type: integer
 *                       example: 15
 *                     currentKoiCount:
 *                       type: integer
 *                       example: 10
 *       403:
 *         description: Unauthorized - User doesn't have permission to view this pond
 *       404:
 *         description: Pond not found
 *       500:
 *         description: Server error
 */
router.get('/getPondById/:id', verifyToken, getPondById);


export default router;