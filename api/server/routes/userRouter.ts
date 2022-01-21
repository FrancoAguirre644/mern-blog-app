import express from 'express';
import userController from '../controllers/userController';

const router = express.Router();

router.route('/users/:id')
    .get(userController.getUser)

export default router; 