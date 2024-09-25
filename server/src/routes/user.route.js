// src/routes/user.route.js
import express from 'express';
import { getAllUsers, getUserById,updateUser,deleteUser } from '../controller/user.controller.js';
const router = express.Router();
// GET METHOD for getalluser
/**
 * @swagger
 * /api/user/getalluser:
 *   get:
 *     tags:
 *     - User Controller
 *     summary: Retrieve all users
 *     responses:
 *       200:
 *         description: Successfully retrieved users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: User ID
 *                   name:
 *                     type: string
 *                     description: User Name
 *                   email:
 *                     type: string
 *                     description: User Email
 *                   userType:
 *                     type: string
 *                     description: Type of the user (Admin, Shop, Staff, Customer)
 *                   userStatus:
 *                     type: boolean
 *                     description: Status of the user (true = Active, false = Inactive)
 */
router.get('/getalluser', getAllUsers);
/** POST Methods */

/**
 * @swagger
 * /api/user/{id}:
 *   get:
 *     tags:
 *     - User Controller
 *     summary: Retrieve a specific user by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Numeric ID of the user to retrieve
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successfully retrieved the user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 username:
 *                   type: string
 *                 email:
 *                   type: string
 *                 userType:
 *                   type: string
 *                 status:
 *                   type: boolean
 *                 phone:
 *                   type: string
 *                 address:
 *                   type: string
 *       404:
 *         description: User not found
 *       400:
 *         description: Invalid request, User ID is missing
 *       500:
 *         description: Server error
 */
router.get('/:id', getUserById);
/**
 * @swagger
 * /api/user/update/{userId}:
 *   put:
 *     tags:
 *     - User Controller
 *     summary: Update a user's information
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the user to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userName:
 *                 type: string
 *                 example: John Doe
 *               userType:
 *                 type: string
 *                 enum: [Admin, Shop, Staff, Customer]
 *                 example: Admin
 *               userAddress:
 *                 type: string
 *                 example: 123 Main St
 *               userPhoneNumber:
 *                 type: string
 *                 example: 123456789
 *               email:
 *                 type: string
 *                 example: johndoe@example.com
 *               userStatus:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: User updated successfully
 *       400:
 *         description: Bad request (User ID is required)
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
router.put('/update/:userId', updateUser);


/**
 * @swagger
 * /api/user/delete/{userId}:
 *   delete:
 *     tags:
 *     - User Controller
 *     summary: Delete a user
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the user to delete
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       400:
 *         description: Bad request (User ID is required)
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
router.delete('/delete/:userId', deleteUser);


export default router;
