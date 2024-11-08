import express from 'express';
import { getPostLikes, likePost, unlikePost } from '../controllers/likeController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

// Маршрут для получения лайков поста
router.get('/:postId', authMiddleware, getPostLikes);

// Маршрут для добавления лайка посту
router.post('/:postId/:userId', authMiddleware, likePost);

// Маршрут для удаления лайка с поста
router.delete('/:postId/:userId', authMiddleware, unlikePost);

export default router;



// import express from 'express';
// import { getPostLikes, likePost, unlikePost } from '../controllers/likeController.js';
// import authMiddleware from '../middlewares/authMiddleware.js';

// const router = express.Router();

// // Маршрут для получения лайков поста
// router.get('/:postId/likes', authMiddleware, getPostLikes);

// // Маршрут для лайка поста
// router.post('/:postId/like/:userId', authMiddleware, likePost);

// // Маршрут для удаления лайка
// router.delete('/:postId/unlike/:userId', authMiddleware, unlikePost);

// export default router;