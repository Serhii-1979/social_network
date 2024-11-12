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

export const updateUserProfile = createAsyncThunk(
  "user/updateUserProfile",
  async (formData, { getState, rejectWithValue }) => {
    const state = getState();
    const token = state.auth?.token || localStorage.getItem("token");

    if (!token) return rejectWithValue("Token is missing");

    try {
      const response = await $api.put("/user/current", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Ошибка обновления профиля:", error.response?.data || error.message);
      return rejectWithValue("Ошибка обновления профиля");
    }
  }
);

// Подписка на пользователя
export const followUser = createAsyncThunk(
  'user/followUser',
  async ({ userId, targetUserId }, { rejectWithValue }) => {
    try {
      const response = await $api.post(`/follow/${userId}/follow/${targetUserId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Отписка от пользователя
export const unfollowUser = createAsyncThunk(
  'user/unfollowUser',
  async ({ userId, targetUserId }, { rejectWithValue }) => {
    try {
      const response = await $api.delete(`/follow/${userId}/unfollow/${targetUserId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Получение времени последнего сообщения с конкретным пользователем
export const fetchLastMessageDate = createAsyncThunk(
  'user/fetchLastMessageDate',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await $api.get(`/messages/lastMessageDate/${userId}`);
      return { userId, lastMessageDate: response.data.lastMessageDate };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Получение времени последнего сообщения и текста последнего сообщения для каждого пользователя
export const fetchLastMessageForUser = createAsyncThunk(
  'user/fetchLastMessageForUser',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await $api.get(`/messages/lastMessageBetweenUsers/${userId}`);
      return { userId, ...response.data }; // Вернуть данные с ID пользователя
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


const userSlice = createSlice({
  name: 'user',
  initialState: {
    users: [],
    currentUser: null,
    lastMessages: {},
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
      })
      .addCase(fetchLastMessageForUser.fulfilled, (state, action) => {
        const { userId, lastMessageDate, lastMessageText } = action.payload;
        console.log("Last message data:", action.payload);
        state.lastMessages[userId] = {
          lastMessageDate,
          lastMessageText,
        };
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.currentUser = action.payload;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(followUser.fulfilled, (state, action) => {
        const { followers_count, following_count } = action.payload;
        if (state.currentUser) {
          state.currentUser.following_count = following_count;
        }
        if (state.currentUser && state.currentUser._id === action.meta.arg.targetUserId) {
          state.currentUser.followers_count = followers_count;
        }
      })
      .addCase(unfollowUser.fulfilled, (state, action) => {
        const { followers_count, following_count } = action.payload;
        if (state.currentUser) {
          state.currentUser.following_count = following_count;
        }
        if (state.currentUser && state.currentUser._id === action.meta.arg.targetUserId) {
          state.currentUser.followers_count = followers_count;
        }
      })
      .addCase(fetchLastMessageDate.fulfilled, (state, action) => {
        const user = state.users.find((u) => u._id === action.payload.userId);
        if (user) {
          user.lastMessageDate = action.payload.lastMessageDate;
        }
      })
      
  },
});

export default userSlice.reducer;
