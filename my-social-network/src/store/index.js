import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import authReducer from './slices/authSlice';
import postReducer from './slices/postSlice';
import likeReducer from './slices/likeSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    auth: authReducer,
    post: postReducer,
    likes: likeReducer,
  },
});

export default store;
