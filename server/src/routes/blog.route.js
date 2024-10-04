import express from 'express';
import { createBlog, getAllBlogs, getBlogById, updateBlog, deleteBlog } from '../controller/blog.controller.js';
import { verifyToken } from '../middleware/verifyUser.js';
const router = express.Router();

/**
 * @swagger
 * /api/blog/createBlog:
 *   post:
 *     tags:
 *     - Blog
 *     summary: Create a new blog
 *     description: This endpoint allows you to create a new blog.
 *     security:
 *      - Authorization: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - blogTitle
 *               - blogContent
 *             properties:
 *               blogTitle:
 *                 type: string
 *                 example: My First Blog
 *               blogContent:
 *                 type: string
 *                 example: This is the content of the blog.
 *     responses:
 *       201:
 *         description: Blog successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Blog successfully created!
 *       400:
 *         description: Bad Request - Invalid input
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       500:
 *         description: Server error
 */
router.post('/createBlog', verifyToken, createBlog);

/**
 * @swagger
 * /api/blog/getAllBlogs:
 *   get:
 *     tags:
 *     - Blog
 *     summary: Get all blogs
 *     description: Retrieve a list of all blogs.
 *     security:
 *      - Authorization: []
 *     responses:
 *       200:
 *         description: A list of blogs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: 1
 *                   title:
 *                     type: string
 *                     example: Blog title
 *                   content:
 *                     type: string
 *                     example: Blog content
 *       500:
 *         description: Server error
 */
router.get('/getAllBlogs',verifyToken, getAllBlogs);

/**
 * @swagger
 * /api/blog/getBlogById/{id}:
 *   get:
 *     tags:
 *     - Blog
 *     summary: Get blog by ID
 *     description: Retrieve a single blog by its ID.
 *     security:
 *      - Authorization: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the blog
 *         schema:
 *           type: string
 *           example: 1
 *     responses:
 *       200:
 *         description: A single blog
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: 1
 *                 title:
 *                   type: string
 *                   example: Blog title
 *                 content:
 *                   type: string
 *                   example: Blog content
 *       404:
 *         description: Blog not found
 *       500:
 *         description: Server error
 */
router.get('/getBlogById/:id', verifyToken,getBlogById);

/**
 * @swagger
 * /api/blog/updateBlog/{id}:
 *   put:
 *     tags:
 *     - Blog
 *     summary: Update blog by ID
 *     description: Update an existing blog by its ID.
 *     security:
 *      - Authorization: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the blog to update
 *         schema:
 *           type: string
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Updated Blog Title
 *               content:
 *                 type: string
 *                 example: Updated blog content
 *     responses:
 *       200:
 *         description: Blog updated successfully
 *       404:
 *         description: Blog not found
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Server error
 */
router.put('/updateBlog/:id', verifyToken,updateBlog);

/**
 * @swagger
 * /api/blog/deleteBlog/{id}:
 *   delete:
 *     tags:
 *     - Blog
 *     summary: Delete blog by ID
 *     description: Delete an existing blog by its ID.
 *     security:
 *      - Authorization: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the blog to delete
 *         schema:
 *           type: string
 *           example: 1
 *     responses:
 *       200:
 *         description: Blog deleted successfully
 *       404:
 *         description: Blog not found
 *       500:
 *         description: Server error
 */
router.delete('/deleteBlog/:id', verifyToken,deleteBlog);

export default router;
