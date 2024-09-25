import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userSlice from "./slice/userSlice";

const reducer = combineReducers({ user: userSlice });

const store = configureStore({ reducer });

export default store;
