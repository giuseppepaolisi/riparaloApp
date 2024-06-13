// redux/slice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.user = action.payload.user;
      // Salva nel localStorage
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.user = null;
      // Rimuovi dal localStorage
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
    loadUserFromStorage: (state) => {
      const token = localStorage.getItem("token");
      const user = JSON.parse(localStorage.getItem("user"));
      if (token && user) {
        state.isAuthenticated = true;
        state.token = token;
        state.user = user;
      }
    },
    verifyToken: (state, action) => {
      if (action.payload.valid) {
        state.isAuthenticated = true;
      } else {
        state.isAuthenticated = false;
        state.token = null;
        state.user = null;
        // Rimuovi dal localStorage
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    },
  },
});

export const {
  login,
  logout,
  loadUserFromStorage,
  verifyToken,
} = authSlice.actions;
export const selectAuth = (state) => state.auth;
export default authSlice.reducer;

// Funzione per verificare il token
export const checkToken = () => async (dispatch) => {
  const token = localStorage.getItem("token");
  if (token) {
    try {
      const response = await await fetch("/api/verify-token", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      dispatch(verifyToken({ valid: true, user: response.data.user }));
    } catch (error) {
      dispatch(verifyToken({ valid: false }));
    }
  } else {
    dispatch(verifyToken({ valid: false }));
  }
};
