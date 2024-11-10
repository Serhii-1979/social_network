import { createSlice } from '@reduxjs/toolkit';
import { jwtDecode } from "jwt-decode";

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: localStorage.getItem('token') || null,
    isAuthenticated: !!localStorage.getItem('token'),
    userId: null,
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem('token', action.payload);

      // Декодируем токен и сохраняем userId
      try {
        const decoded = jwtDecode(action.payload);
        state.userId = decoded.user_id; // Извлекаем user_id из декодированного токена
        console.log("Decoded User ID:", decoded.user_id);
      } catch (error) {
        console.error("Ошибка декодирования токена:", error);
      }
    },
    removeToken: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      state.userId = null; // очищаем userId при выходе
      localStorage.removeItem('token');
    },
  },
});

export const { setToken, removeToken } = authSlice.actions;
export default authSlice.reducer;
