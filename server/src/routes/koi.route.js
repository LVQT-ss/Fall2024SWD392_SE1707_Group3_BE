import express from 'express';
import { addKoi, getAllKoi, addKoiRecord,getAllKoiRecord ,updateKoi,deleteKoi,deleteKoiByUser,getAllKoiByUser} from "../controller/Koifish.controller.js"
import { verifyToken } from '../middleware/verifyUser.js';

const router = express.Router();

// KOI TABLE
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
 *       - Admin Controller
 *     summary: Retrieve all koi
 *     security:
 *       - Authorization: []
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


// KOI RECORD TABLE
/**
 * @swagger
 * /api/koi/koi-record:
 *   post:
 *     tags:
 *       - Koi Record Controller
 *     summary: Add a new Koi record
 *     description: This endpoint allows adding a new Koi record for a specific Koi fish.
 *     
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - fishId
 *               - recordDate
 *               - length
 *               - bodyShape
 *               - age
 *             properties:
 *               fishId:
 *                 type: integer
 *                 example: 1
 *               recordDate:
 *                 type: string
 *                 format: date
 *                 example: "2024-10-01"
 *               length:
 *                 type: number
 *                 format: float
 *                 example: 30.5
 *               weight:
 *                 type: number
 *                 format: float
 *                 example: 5.0
 *               bodyShape:
 *                 type: string
 *                 enum: [ 'slim', 'normal', 'heavy' ]
 *                 example: "normal"
 *               age:
 *                 type: integer
 *                 example: 18
 *     responses:
 *       201:
 *         description: Koi record added successfully
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
 *                   example: "Koi record added successfully"
 *                 data:
 *                   $ref: '#/components/schemas/KoiRecord'
 *       400:
 *         description: Bad Request - Missing or invalid input
 *       404:
 *         description: Not Found - Koi fish not found
 *       500:
 *         description: Server error
 * 
 * components:
 *   schemas:
 *     KoiRecord:
 *       type: object
 *       properties:
 *         koiRecordId:
 *           type: integer
 *         fishId:
 *           type: integer
 *         recordDate:
 *           type: string
 *           format: date
 *         length:
 *           type: number
 *         weight:
 *           type: number
 *         bodyShape:
 *           type: string
 *         age:
 *           type: integer
 *         calculateWeight:
 *           type: number
 *         foodRequire:
 *           type: number
 */
router.post('/koi-record', verifyToken,addKoiRecord);


/**
 * @swagger
 * /api/koi/getAllKoiRecord:
 *   get:
 *     tags:
 *       - Koi Record Controller
 *     summary: Retrieve all koi record
 *     security:
 *       - Authorization: []
 *     responses:
 *       200:
 *         description: Successfully retrieved koi fish record
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/KoiRecord'
 *       500:
 *         description: Server error
 */
router.get('/getAllKoiRecord', verifyToken, getAllKoiRecord);

/**
 * @swagger
 * /api/koi/updateKoi/{fishId}:
 *   put:
 *     tags:
 *       - Koi Fish Controller
 *     summary: Update an existing Koi fish
 *     description: Update koi fish details based on fishId
 *     security:
 *       - Authorization: []
 *     parameters:
 *       - in: path
 *         name: fishId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The koi fish ID to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               koiName:
 *                 type: string
 *               koiImage:
 *                 type: string
 *               koiGender:
 *                 type: string
 *               koiBreed:
 *                 type: integer
 *               koiOrigin:
 *                 type: number
 *                 format: float
 *               price:
 *                 type: number
 *                 format: float
 *               currentPondId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Koi fish updated successfully
 *       404:
 *         description: Koi fish not found
 *       500:
 *         description: Server error
 */
router.put('/updateKoi/:fishId', verifyToken, updateKoi);

/**
 * @swagger
 * /api/koi/deleteKoi/{fishId}:
 *   delete:
 *     tags:
 *       - Koi Fish Controller
 *     summary: Delete an existing Koi fish
 *     description: Delete koi fish based on fishId
 *     security:
 *       - Authorization: []
 *     parameters:
 *       - in: path
 *         name: fishId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The koi fish ID to delete
 *     responses:
 *       200:
 *         description: Koi fish deleted successfully
 *       404:
 *         description: Koi fish not found
 *       500:
 *         description: Server error
 */
router.delete('/deleteKoi/:fishId', verifyToken, deleteKoi);

/**
 * @swagger
 * /api/koi/deleteKoi/{fishId}:
 *   delete:
 *     tags:
 *       - Admin Controller
 *     summary: Delete an existing Koi fish
 *     description: Delete koi fish based on fishId
 *     security:
 *       - Authorization: []
 *     parameters:
 *       - in: path
 *         name: fishId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The koi fish ID to delete
 *     responses:
 *       200:
 *         description: Koi fish deleted successfully
 *       404:
 *         description: Koi fish not found
 *       500:
 *         description: Server error
 */
router.delete('/deleteKoi/:fishId', verifyToken, deleteKoi);

/**
 * @swagger
 * /api/koi/deleteKoiByUser/{fishId}:
 *   delete:
 *     tags:
 *       - Koi Fish Controller
 *     summary: Delete an existing Koi fish
 *     description: Delete koi fish based on fishId
 *     security:
 *       - Authorization: []
 *     parameters:
 *       - in: path
 *         name: fishId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The koi fish ID to delete
 *     responses:
 *       200:
 *         description: Koi fish deleted successfully
 *       404:
 *         description: Koi fish not found
 *       500:
 *         description: Server error
 */
router.delete('/deleteKoiByUser/:fishId', verifyToken, deleteKoiByUser);

/**
 * @swagger
 * /api/koi/getAllKoiByUser:
 *   get:
 *     tags:
 *       - Koi Fish Controller
 *     summary: Retrieve all koi record
 *     security:
 *       - Authorization: []
 *     responses:
 *       200:
 *         description: Successfully retrieved koi fish record
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/KoiRecord'
 *       500:
 *         description: Server error
 */
router.get('/getAllKoiByUser', verifyToken, getAllKoiByUser);


export default router;