import express from 'express';
import { createComment, updateComment, deleteComment } from '../controller/comment.controller.js';

const router = express.Router();

// Route tạo bình luận mới
router.post('/createComment', createComment);

// Route cập nhật bình luận theo ID
router.put('/updateComment/:id', updateComment);

// Route xóa bình luận theo ID
router.delete('/deleteComment/:id', deleteComment);

export default router;