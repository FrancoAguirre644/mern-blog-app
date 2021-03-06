import express from 'express';
import commentController from '../controllers/commentController';
import auth from '../middleware/auth';

const router = express.Router();

router.post('/comments', auth, commentController.createComment);

router.get('/comments/blog/:id', commentController.getComments);

router.post('/comments/reply_comment', auth, commentController.replyComment);

router.patch('/comments/:id', auth, commentController.updateComment);

router.delete('/comments/:id', auth, commentController.deleteComment);

export default router;