import express from 'express';
import blogController from '../controllers/blogController';
import auth from '../middleware/auth';

const router = express.Router();

router.post('/blogs', auth, blogController.createBlog);

router.get('/home/blogs', blogController.getHomeBlogs);

router.get('/blogs/category/:id', blogController.getBlogsByCategory);

router.get('/blogs/user/:id', blogController.getBlogsByUser);

router.get('/blogs/:id', blogController.getBlog);

export default router;