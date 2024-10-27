import express from 'express';
import { 
  createBlog, 
  getAllBlogs, 
  getBlogById, 
  updateBlog, 
  deleteBlog, 
  getActiveBlogs, 
  updateBlogStatus 
} from '../controller/blog.controller.js';
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
 *       - Authorization: []
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
 *               image:
 *                 type: string
 *                 example: https://example.com/image.jpg
 *     responses:
 *       201:
 *         description: Blog successfully created
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
 *                   blogId:
 *                     type: string
 *                     example: 1
 *                   blogTitle:
 *                     type: string
 *                     example: Blog title
 *                   blogContent:
 *                     type: string
 *                     example: Blog content
 *       500:
 *         description: Server error
 */
router.get('/getAllBlogs', getAllBlogs);

/**
 * @swagger
 * /api/blog/getBlogById/{id}:
 *   get:
 *     tags:
 *     - Blog
 *     summary: Get a blog by ID
 *     description: Retrieve a single blog by its ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the blog to retrieve
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Blog details
 *       404:
 *         description: Blog not found
 *       500:
 *         description: Server error
 */
router.get('/getBlogById/:id', getBlogById);

/**
 * @swagger
 * /api/blog/updateBlog/{id}:
 *   put:
 *     tags:
 *     - Blog
 *     summary: Update a blog
 *     description: Update blog information.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the blog to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               blogTitle:
 *                 type: string
 *               blogContent:
 *                 type: string
 *               image:
 *                 type: string
 *     responses:
 *       200:
 *         description: Blog successfully updated
 *       400:
 *         description: Bad Request - No fields to update
 *       404:
 *         description: Blog not found
 *       500:
 *         description: Server error
 */
router.put('/updateBlog/:id', updateBlog);

/**
 * @swagger
 * /api/blog/deleteBlog/{id}:
 *   delete:
 *     tags:
 *     - Blog
 *     summary: Delete a blog
 *     description: Delete a blog by its ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the blog to delete
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Blog successfully deleted
 *       404:
 *         description: Blog not found
 *       500:
 *         description: Server error
 */
router.delete('/deleteBlog/:id', deleteBlog);

/**
 * @swagger
 * /api/blog/getActiveBlogs:
 *   get:
 *     tags:
 *     - Blog
 *     summary: Get all active blogs
 *     description: Retrieve a list of all active blogs.
 *     responses:
 *       200:
 *         description: A list of active blogs
 *       500:
 *         description: Server error
 */
router.get('/getActiveBlogs', getActiveBlogs);

/**
 * @swagger
 * /api/blog/updateBlogStatus/{id}:
 *   put:
 *     tags:
 *     - Blog
 *     summary: Update blog status
 *     description: Update the status of a blog.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the blog to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               blogStatus:
 *                 type: string
 *                 enum: [active, inActive, waiting]
 *     responses:
 *       200:
 *         description: Blog status updated successfully
 *       400:
 *         description: Bad Request - Invalid ID or status value
 *       404:
 *         description: Blog not found
 *       500:
 *         description: Server error
 */
router.put('/updateBlogStatus/:id', updateBlogStatus);

export default router;
