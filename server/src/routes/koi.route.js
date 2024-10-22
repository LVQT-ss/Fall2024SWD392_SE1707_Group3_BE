import express from 'express';
import { addKoi, getAllKoi, addKoiRecord,getAllKoiRecord ,updateKoi,deleteKoi,deleteKoiByUser,getAllKoiByUser,getKoiFishById,getKoiFishByIdForManager, addKoiHealth, deleteKoiHealth, updateKoiHealth, transferKoiFish, getFishTransfers} from "../controller/Koifish.controller.js"
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
 *   put:
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
router.put('/deleteKoiByUser/:fishId', verifyToken, deleteKoiByUser);

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


// Router configuration (add to Koifish.routes.js)
/**
 * @swagger
 * /api/koi/getKoiFishById/{fishId}:
 *   get:
 *     tags:
 *       - Koi Fish Controller
 *     summary: Retrieve a specific koi fish by ID
 *     description: Get detailed information about a specific koi fish including its pond and owner details
 *     security:
 *       - Authorization: []
 *     parameters:
 *       - in: path
 *         name: fishId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the koi fish to retrieve
 *     responses:
 *       200:
 *         description: Successfully retrieved koi fish
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
 *                     fishId:
 *                       type: integer
 *                     koiName:
 *                       type: string
 *                     koiImage:
 *                       type: string
 *                     koiGender:
 *                       type: string
 *                     koiBreed:
 *                       type: integer
 *                     koiOrigin:
 *                       type: number
 *                     price:
 *                       type: number
 *                     currentPondId:
 *                       type: integer
 *                     Pond:
 *                       type: object
 *                       properties:
 *                         pondId:
 *                           type: integer
 *                         pondName:
 *                           type: string
 *                         pondImage:
 *                           type: string
 *                         pondSize:
 *                           type: number
 *                         pondDepth:
 *                           type: number
 *                         pondVolume:
 *                           type: number
 *                         pondDrains:
 *                           type: integer
 *                         pondAeroCapacity:
 *                           type: number
 *                     User:
 *                       type: object
 *                       properties:
 *                         userId:
 *                           type: integer
 *                         username:
 *                           type: string
 *                         email:
 *                           type: string
 *                         userAddress:
 *                           type: string
 *                         userPhoneNumber:
 *                           type: string
 *       403:
 *         description: Unauthorized - User doesn't have permission to view this koi fish
 *       404:
 *         description: Koi fish not found
 *       500:
 *         description: Server error
 */
router.get('/getKoiFishById/:fishId', verifyToken, getKoiFishById);

/**
 * @swagger
 * /api/koi/getKoiFishByIdForManager/{fishId}:
 *   get:
 *     tags:
 *       - Admin Controller
 *     summary: Retrieve a specific koi fish by ID
 *     description: Get detailed information about a specific koi fish including its pond and owner details
 *     security:
 *       - Authorization: []
 *     parameters:
 *       - in: path
 *         name: fishId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the koi fish to retrieve
 *     responses:
 *       200:
 *         description: Successfully retrieved koi fish
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
 *                     fishId:
 *                       type: integer
 *                     koiName:
 *                       type: string
 *                     koiImage:
 *                       type: string
 *                     koiGender:
 *                       type: string
 *                     koiBreed:
 *                       type: integer
 *                     koiOrigin:
 *                       type: number
 *                     price:
 *                       type: number
 *                     currentPondId:
 *                       type: integer
 *                     Pond:
 *                       type: object
 *                       properties:
 *                         pondId:
 *                           type: integer
 *                         pondName:
 *                           type: string
 *                         pondImage:
 *                           type: string
 *                         pondSize:
 *                           type: number
 *                         pondDepth:
 *                           type: number
 *                         pondVolume:
 *                           type: number
 *                         pondDrains:
 *                           type: integer
 *                         pondAeroCapacity:
 *                           type: number
 *                     User:
 *                       type: object
 *                       properties:
 *                         userId:
 *                           type: integer
 *                         username:
 *                           type: string
 *                         email:
 *                           type: string
 *                         userAddress:
 *                           type: string
 *                         userPhoneNumber:
 *                           type: string
 *       403:
 *         description: Unauthorized - User doesn't have permission to view this koi fish
 *       404:
 *         description: Koi fish not found
 *       500:
 *         description: Server error
 */
router.get('/getKoiFishByIdForManager/:fishId',verifyToken ,getKoiFishByIdForManager);


//--- KOI HEALTH 
/**
 * @swagger
 * /api/koi/addKoiHealth:
 *   post:
 *     tags:
 *       - Koi Health Controller
 *     summary: Add a new Koi health record
 *     description: This endpoint allows adding a new health record for a specific Koi fish.
 *     security:
 *       - Authorization: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - fishId
 *               - healthDate
 *             properties:
 *               fishId:
 *                 type: integer
 *                 example: 1
 *               healthDate:
 *                 type: string
 *                 format: date
 *                 example: "2024-10-15"
 *               illness:
 *                 type: string
 *                 example: "Ich"
 *               endDate:
 *                 type: string
 *                 format: date
 *                 example: "2024-10-20"
 *               address:
 *                 type: string
 *                 example: "123 Pond St"
 *               medicine:
 *                 type: string
 *                 example: "Parasiticide"
 *               price:
 *                 type: integer
 *                 example: 50
 *     responses:
 *       201:
 *         description: Koi health record added successfully
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
 *                   example: "Koi health record added successfully"
 *                 data:
 *                   $ref: '#/components/schemas/KoiHealth'
 *       400:
 *         description: Bad Request - Missing or invalid input
 *       404:
 *         description: Not Found - Koi fish not found
 *       500:
 *         description: Server error
 */
router.post('/addKoiHealth', verifyToken, addKoiHealth);
/**
 * @swagger
 * /api/koi/updateKoiHealth/{healthId}:
 *   put:
 *     tags:
 *       - Koi Health Controller
 *     summary: Update a Koi health record
 *     description: This endpoint allows updating an existing Koi health record.
 *     parameters:
 *       - in: path
 *         name: healthId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the Koi health record to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               healthDate:
 *                 type: string
 *                 format: date
 *                 example: "2024-10-15"
 *               illness:
 *                 type: string
 *                 example: "Ich"
 *               endDate:
 *                 type: string
 *                 format: date
 *                 example: "2024-10-20"
 *               address:
 *                 type: string
 *                 example: "123 Pond St"
 *               medicine:
 *                 type: string
 *                 example: "Parasiticide"
 *               price:
 *                 type: integer
 *                 example: 50
 *     responses:
 *       200:
 *         description: Koi health record updated successfully
 *       400:
 *         description: Bad Request - Invalid or missing input
 *       404:
 *         description: Not Found - Koi health record not found
 *       500:
 *         description: Server error
 */
router.put('/updateKoiHealth/:healthId', verifyToken, updateKoiHealth);

// KOI HEALTH RECORD DELETE
/**
 * @swagger
 * /api/koi/deleteKoiHealth/{healthId}:
 *   delete:
 *     tags:
 *       - Koi Health Controller
 *     summary: Delete a Koi health record
 *     description: This endpoint allows deleting an existing Koi health record.
 *     parameters:
 *       - in: path
 *         name: healthId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the Koi health record to delete
 *     responses:
 *       200:
 *         description: Koi health record deleted successfully
 *       404:
 *         description: Not Found - Koi health record not found
 *       500:
 *         description: Server error
 */
router.delete('/deleteKoiHealth/:healthId', verifyToken, deleteKoiHealth);

/**
 * @swagger
 * /api/koi/transferKoi:
 *   post:
 *     tags:
 *       - Koi Fish Controller
 *     summary: Transfer a koi fish between ponds
 *     description: This endpoint transfers a koi fish from one pond to another and logs the transfer details.
 *     security:
 *       - Authorization: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - fishId
 *               - newPondId
 *             properties:
 *               fishId:
 *                 type: integer
 *                 description: The ID of the koi fish to transfer
 *                 example: 1
 *               newPondId:
 *                 type: integer
 *                 description: The ID of the new pond where the koi fish is transferred
 *                 example: 2
 *               reason:
 *                 type: string
 *                 description: The reason for the transfer
 *                 example: "Pond maintenance"
 *     responses:
 *       201:
 *         description: Koi fish transferred successfully
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
 *                   example: "Koi fish transferred successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     transferId:
 *                       type: integer
 *                       description: ID of the fish transfer record
 *                       example: 5
 *                     fishId:
 *                       type: integer
 *                       example: 1
 *                     oldPondId:
 *                       type: integer
 *                       example: 1
 *                     newPondId:
 *                       type: integer
 *                       example: 2
 *                     transferDate:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-10-21T10:00:00.000Z"
 *                     reason:
 *                       type: string
 *                       example: "Pond maintenance"
 *       400:
 *         description: Bad Request - Missing or invalid input
 *       404:
 *         description: Not Found - Koi fish or pond not found
 *       500:
 *         description: Server error
 */
router.post('/transferKoi', verifyToken, transferKoiFish);

/**
 * @swagger
 * /api/koi/fishTransfers/{fishId}:
 *   get:
 *     tags:
 *       - Koi Fish Controller
 *     summary: Retrieve fish transfer details
 *     description: Get all fish transfers globally or transfers for a specific fish by providing the fishId.
 *     security:
 *       - Authorization: []
 *     parameters:
 *       - in: path
 *         name: fishId
 *         required: false
 *         schema:
 *           type: integer
 *         description: The ID of the koi fish to filter transfers
 *     responses:
 *       200:
 *         description: Successfully retrieved fish transfers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   transferId:
 *                     type: integer
 *                   fishId:
 *                     type: integer
 *                   koiName:
 *                     type: string
 *                   oldPondId:
 *                     type: integer
 *                   newPondId:
 *                     type: integer
 *                   transferDate:
 *                     type: string
 *                     format: date-time
 *                   reason:
 *                     type: string
 *                   OldPond:
 *                     type: object
 *                     properties:
 *                       pondName:
 *                         type: string
 *                   NewPond:
 *                     type: object
 *                     properties:
 *                       pondName:
 *                         type: string
 *       404:
 *         description: No transfers found
 *       500:
 *         description: Server error
 */
router.get('/fishTransfers/:fishId?', verifyToken, getFishTransfers);

export default router;