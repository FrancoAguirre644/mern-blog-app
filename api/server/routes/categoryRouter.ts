import express from 'express';
import categoryController from '../controllers/categoryController';
import auth from '../middleware/auth';

const router = express.Router();

router.route('/categories')
    .get(categoryController.getCategories)
    .post(auth, categoryController.createCategory)

router.route('/categories/:id')
    .patch(auth, categoryController.updateCategory)
    .delete(auth, categoryController.deleteCategory)

export default router; 