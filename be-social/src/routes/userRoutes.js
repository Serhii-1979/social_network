import express from 'express';
import { getUserProfile, updateUserProfile, uploadProfileImage, getAllUsers } from '../controllers/userController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

// Получение профиля пользователя
router.get('/:userId', getUserProfile);

// Получение всех пользователей
router.get('/', getAllUsers);

// Обновление профиля пользователя с загрузкой изображения
router.put('/current', authMiddleware, uploadProfileImage, updateUserProfile);

export default router;