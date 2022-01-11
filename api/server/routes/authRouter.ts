import express from 'express';
import authController from '../controllers/authController';
import { validRegister } from '../middleware/valid';

const router = express.Router();

router.post('/register', validRegister, authController.register);
router.post('/active', authController.activeAccount);
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.post('/refresh_token', authController.refreshToken);

export default router;