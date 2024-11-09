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


export const fetchCurrentUser = createAsyncThunk('user/fetchCurrentUser', async (_, { getState, rejectWithValue }) => {
  const state = getState();
  const token = state.auth?.token || localStorage.getItem('token');

  if (!token) return rejectWithValue("Token is missing");

  try {
    const response = await $api.get('/user/current', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Ошибка получения профиля пользователя:", error.response?.data || error.message);
    return rejectWithValue("Ошибка получения профиля пользователя");
  }
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
      .addCase(fetchUserById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentUser = action.payload; // Получаем пользователя вместе с его постами
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        console.log('Авторизованный пользователь:', action.payload);
        state.status = 'failed';
        state.error = action.error.message;
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
