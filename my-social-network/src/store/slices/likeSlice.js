// src/store/slices/likeSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { $api } from '../../utils/api.ts';

// Получение всех лайков для поста
export const fetchPostLikes = createAsyncThunk('likes/fetchPostLikes', async (postId) => {
  const response = await $api.get(`/post/${postId}/likes`);
  return { postId, likes: response.data };
});

// Лайк поста
export const likePost = createAsyncThunk('likes/likePost', async ({ postId, userId }) => {
  await $api.post(`/post/${postId}/like/${userId}`);
  return { postId, userId };
});

// Удаление лайка
export const unlikePost = createAsyncThunk('likes/unlikePost', async ({ postId, userId }) => {
  await $api.delete(`/post/${postId}/unlike/${userId}`);
  return { postId, userId };
});

const likeSlice = createSlice({
  name: 'likes',
  initialState: {
    likesByPost: {},
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPostLikes.fulfilled, (state, action) => {
        const { postId, likes } = action.payload;
        state.likesByPost[postId] = likes;
      })
      .addCase(likePost.fulfilled, (state, action) => {
        const { postId, userId } = action.payload;
        const postLikes = state.likesByPost[postId] || [];
        postLikes.push({ post_id: postId, user_id: userId });
        state.likesByPost[postId] = postLikes;
      })
      .addCase(unlikePost.fulfilled, (state, action) => {
        const { postId, userId } = action.payload;
        const postLikes = state.likesByPost[postId] || [];
        state.likesByPost[postId] = postLikes.filter((like) => like.user_id !== userId);
      });
  },
});

export default likeSlice.reducer;
