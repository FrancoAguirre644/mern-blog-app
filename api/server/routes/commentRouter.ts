import express from 'express';
import commentController from '../controllers/commentController';
import auth from '../middleware/auth';

const router = express.Router();

router.post('/comments', auth, commentController.createComment);

router.get('/comments/blog/:id', commentController.getComments);


export default router;