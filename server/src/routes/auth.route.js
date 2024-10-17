import expess from 'express';
import { login,register,staffRegister } from '../controller/auth.controller.js';

const router = expess.Router();

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     tags:
 *     - Auth Controller
 *     summary: Register a new user
 *     description: This endpoint allows you to create a new user in the system by providing the necessary details.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - usertype
 *               - username
 *               - email
 *               - password
 *             properties:
 *               usertype:
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
 * /api/auth/login:
 *   post:
 *     tags:
 *     - Auth Controller
 *     summary: Log in a user
 *     description: This endpoint allows a user to log in by providing their username and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: admin
 *               password:
 *                 type: string
 *                 example: admin
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
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *                 user:
 *                   type: object
 *                   properties:
 *                     userId:
 *                       type: integer
 *                     username:
 *                       type: string
 *                     email:
 *                       type: string
 *                     usertype:
 *                       type: string
 *       400:
 *         description: Bad Request - Missing or invalid input
 *       401:
 *         description: Unauthorized - Invalid username or password
 *       500:
 *         description: Server error
 */
router.post('/login', login);

/**
 * @swagger
 * /api/auth/staff-register:
 *   post:
 *     tags:
 *     - Auth Controller
 *     summary: Register a new staff member
 *     description: This endpoint allows you to register a new staff member in the system.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: johnstaff
 *               email:
 *                 type: string
 *                 format: email
 *                 example: johnstaff@company.com
 *               password:
 *                 type: string
 *                 example: StaffPass123!
 *               userAddress:
 *                 type: string
 *                 example: 123 Staff St, Stafftown, USA
 *               userPhoneNumber:
 *                 type: string
 *                 example: +1234567890
 *     responses:
 *       201:
 *         description: Staff member successfully registered
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Staff member successfully registered! Awaiting admin approval.
 *                 user:
 *                   type: object
 *                   properties:
 *                     userId:
 *                       type: integer
 *                     username:
 *                       type: string
 *                     email:
 *                       type: string
 *                     usertype:
 *                       type: string
 *                     userStatus:
 *                       type: string
 *       400:
 *         description: Bad Request - Invalid user input
 *       409:
 *         description: Conflict - User already exists
 *       500:
 *         description: Server Error
 */
router.post('/staff-register', staffRegister);


export default router;