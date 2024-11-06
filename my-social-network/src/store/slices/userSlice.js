// src/store/slices/userSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { $api } from '../../utils/api.ts';

// Получение всех пользователей
export const fetchUsers = createAsyncThunk('user/fetchUsers', async () => {
  const response = await $api.get('/user');
  return response.data;
});

// Получение данных пользователя по ID
export const fetchUserById = createAsyncThunk('user/fetchUserById', async (userId) => {
  const response = await $api.get(`/user/${userId}?populate=posts`);
  return response.data;
});

// Получение данных текущего пользователя


export const fetchCurrentUser = createAsyncThunk('user/fetchCurrentUser', async (_, { getState }) => {
  const state = getState();
  const token = state.auth?.token || localStorage.getItem('token'); // Получаем токен из состояния или localStorage

  if (!token) throw new Error("Token is missing");

  const response = await $api.get('/user/current', {
    headers: {
      Authorization: `Bearer ${token}`, // Передаем токен в заголовке Authorization
    },
  });

  return response.data;
});



const userSlice = createSlice({
  name: 'user',
  initialState: {
    users: [],
    currentUser: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users = action.payload;
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentUser = action.payload;
      })
      .addCase(fetchCurrentUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        console.log('Текущий пользователь:', action.payload);
        state.status = 'succeeded';
        state.currentUser = action.payload;
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        console.error('Ошибка загрузки текущего пользователя:', action.error.message);
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
