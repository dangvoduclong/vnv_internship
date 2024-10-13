import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createUser,
  getUserDetail,
  EditUser,
  removeUser,
} from "../../axios/userServices";

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await getUserDetail();
  return response;
});

export const addUser = createAsyncThunk("users/addUser", async (user) => {
  const response = await createUser(user);
  return response;
});

export const updateUser = createAsyncThunk("users/EditUser", async (user) => {
  const response = await EditUser(user);
  return response;
});

export const deleteUser = createAsyncThunk("users/deleteUser", async (user) => {
  await removeUser(user.id);
  return user.id;
});

const userApiSlice = createSlice({
  name: "userList",
  initialState: {
    users: [],
    loading: false,
    error: null,
  },
  reducers: {
    addUser: (state, action) => {
      state.users.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.users.push(action.payload);
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const index = state.users.findIndex(
          (user) => user.id === action.payload.id
        );
        state.users[index] = action.payload;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        const index = state.users.findIndex(
          (user) => user.id === action.payload
        );
        if (index !== -1) {
          state.users.splice(index, 1);
        }
      });
  },
});

export const selectUsers = (state) => state.userList.users;
export const selectError = (state) => state.userList.error;
export const selectLoading = (state) => state.userList.loading;

export default userApiSlice.reducer;
