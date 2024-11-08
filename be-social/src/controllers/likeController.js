

import Like from '../models/likeModel.js';
import Post from '../models/postModel.js';
import mongoose from 'mongoose';

// Получение лайков для поста
export const getPostLikes = async (req, res) => {
  const { postId } = req.params;

  // Проверка на валидность ID поста
  if (!mongoose.Types.ObjectId.isValid(postId)) {
    return res.status(400).json({ error: "Invalid post ID format" });
  }

  try {
    const likes = await Like.find({ post_id: postId });
    res.status(200).json(likes);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при получении лайков', details: error.message });
  }
};

// Лайк поста
export const likePost = async (req, res) => {
  const { postId, userId } = req.params;
  console.log("Attempting to like post:", postId, "by user:", userId);

  // Проверка на валидность ID поста и пользователя
  if (!mongoose.Types.ObjectId.isValid(postId) || !mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ error: "Invalid post or user ID format" });
  }

  try {
    const post = await Post.findById(postId);
    if (!post) {
      console.log("Post not found");
      return res.status(404).json({ error: 'Пост не найден' });
    }

    // Проверяем, существует ли уже лайк от этого пользователя
    const existingLike = await Like.findOne({ post_id: postId, user_id: userId });
    if (existingLike) {
      console.log("Post already liked by user");
      return res.status(400).json({ error: 'Пост уже лайкнут' });
    }

    // Создаем новый лайк
    const like = new Like({
      post_id: postId,
      user_id: userId,
      created_at: new Date(),
    });

    await like.save();

    // Увеличиваем счетчик лайков в документе поста
    post.likes_count += 1;
    await post.save();

    res.status(201).json(like);
  } catch (error) {
    console.error("Error in likePost:", error);
    res.status(500).json({ error: 'Ошибка при лайке поста', details: error.message });
  }
};

// Удаление лайка
export const unlikePost = async (req, res) => {
  const { postId, userId } = req.params;

  // Проверка на валидность ID поста и пользователя
  if (!mongoose.Types.ObjectId.isValid(postId) || !mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ error: "Invalid post or user ID format" });
  }

  try {
    const like = await Like.findOne({ post_id: postId, user_id: userId });
    if (!like) {
      return res.status(404).json({ error: 'Лайк не найден' });
    }

    // Удаляем лайк
    await Like.findByIdAndDelete(like._id);

    // Уменьшаем счетчик лайков в документе поста
    const post = await Post.findById(postId);
    post.likes_count = Math.max(0, post.likes_count - 1); // Убеждаемся, что счетчик не уходит ниже нуля
    await post.save();

    res.status(200).json({ message: 'Лайк удалён' });
  } catch (error) {
    console.error("Error in unlikePost:", error);
    res.status(500).json({ error: 'Ошибка при удалении лайка', details: error.message });
  }
};




// import Like from '../models/likeModel.js';
// import Post from '../models/postModel.js';
// import mongoose from 'mongoose';

// // Получение лайков для поста
// export const getPostLikes = async (req, res) => {
//   try {
//     const likes = await Like.find({ post_id: req.params.postId });
//     res.status(200).json(likes);
//   } catch (error) {
//     res.status(500).json({ error: 'Ошибка при получении лайков' });
//   }
// };

// // Лайк поста
// export const likePost = async (req, res) => {
//   const { postId, userId } = req.params;
//   console.log("Attempting to like post:", postId, "by user:", userId);

//   // Проверка валидности ID
//   if (!mongoose.Types.ObjectId.isValid(postId) || !mongoose.Types.ObjectId.isValid(userId)) {
//     return res.status(400).json({ error: "Invalid post or user ID format" });
//   }

//   try {
//     const post = await Post.findById(postId);
//     if (!post) {
//       console.log("Post not found");
//       return res.status(404).json({ error: 'Пост не найден' });
//     }

//     const existingLike = await Like.findOne({ post_id: postId, user_id: userId });
//     if (existingLike) {
//       console.log("Post already liked by user");
//       return res.status(400).json({ error: 'Пост уже лайкнут' });
//     }

//     const like = new Like({
//       post_id: postId,
//       user_id: userId,
//       created_at: new Date(),
//     });

//     await like.save();

//     post.likes_count += 1;
//     await post.save();

//     res.status(201).json(like);
//   } catch (error) {
//     console.error("Error in likePost:", error);
//     res.status(500).json({ error: 'Ошибка при лайке поста', details: error.message });
//   }
// };

// // Удаление лайка
// export const unlikePost = async (req, res) => {
//   const { postId, userId } = req.params;

//   try {
//     const like = await Like.findOne({ post_id: postId, user_id: userId });
//     if (!like) return res.status(404).json({ error: 'Лайк не найден' });

//     await Like.findByIdAndDelete(like._id);

//     const post = await Post.findById(postId);
//     post.likes_count -= 1;
//     await post.save();

//     res.status(200).json({ message: 'Лайк удалён' });
//   } catch (error) {
//     res.status(500).json({ error: 'Ошибка при удалении лайка' });
//   }
// };
