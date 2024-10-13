import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice/userSlice.js";
import userApiSlice from "./slice/userApiSlice.js";

const store = configureStore({
  reducer: {
    user: userReducer,
    userList: userApiSlice,
  },
});

export default store;
