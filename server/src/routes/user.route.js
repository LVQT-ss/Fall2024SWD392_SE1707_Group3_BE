// src/routes/user.route.js
import express from 'express';
import { getAllUsers, register, login, getUserById,updateUser,deleteUser } from '../controller/user.controller.js';
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
 * /api/user/register:
 *   post:
 *     tags:
 *     - User Controller
 *     summary: Register a new user
 *     description: This endpoint allows you to create a new user in the system by providing the necessary details.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userType
 *               - username
 *               - email
 *               - password
 *             properties:
 *               userType:
 *                 type: string
 *                 enum: ['Admin', 'Shop', 'Staff', 'Customer']
 *                 example: Customer
 *               username:
 *                 type: string
 *                 example: johndoe
 *               email:
 *                 type: string
 *                 format: email
 *                 example: johndoe@mail.com
 *               password:
 *                 type: string
 *                 example: JohnDoe20!@
 *               userAddress:
 *                 type: string
 *                 example: 123 Main St, Anytown, USA
 *               userPhoneNumber:
 *                 type: string
 *                 example: +1234567890
 *     responses:
 *       201:
 *         description: User successfully registered
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User successfully registered!
 *       400:
 *         description: Bad Request - Invalid user input
 *       409:
 *         description: Conflict - User already exists
 *       500:
 *         description: Server Error
 */
router.post('/register', register);
/**
 * @swagger
 * /api/user/login:
 *   post:
 *     tags:
 *     - User Controller
 *     summary: Log in a user
 *     description: This endpoint allows a user to log in by providing their email and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: johndoe@mail.com
 *               password:
 *                 type: string
 *                 example: johnDoe20!@
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Login successful
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     username:
 *                       type: string
 *                     email:
 *                       type: string
 *                     userType:
 *                       type: string
 *                     status:
 *                       type: boolean
 *       400:
 *         description: Bad Request - Missing or invalid input
 *       401:
 *         description: Unauthorized - Invalid email or password
 *       500:
 *         description: Server error
 */
router.post('/login', login);


export default router;
