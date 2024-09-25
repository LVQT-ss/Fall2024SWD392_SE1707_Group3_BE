// src/routes/user.route.js
import express from 'express';
import { getAllUsers, register, login, getUserById,updateUser,deleteUser } from '../controller/user.controller.js';
const router = express.Router();
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


export default router;
