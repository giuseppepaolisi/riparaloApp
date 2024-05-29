// redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer, { loadUserFromStorage } from "./slice";

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

store.dispatch(loadUserFromStorage());

export default store;
