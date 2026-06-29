import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import axios from "axios";

const API = "http://localhost:3000/users";

export const fetchUsers =
  createAsyncThunk(
    "adminUsers/fetchUsers",
    async (_, thunkAPI) => {
      try {
        const response =
          await axios.get(API);
        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(
          error.message
        );
      }
    }
  );

export const updateUserStatus =
  createAsyncThunk(
    "adminUsers/updateUserStatus",
    async (user, thunkAPI) => {
      try {
        const response =
          await axios.put(
            `${API}/${user.id}`,
            user
          );

        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(
          error.message
        );
      }
    }
  );

const adminUserSlice =
  createSlice({
    name: "adminUsers",

    initialState: {
      users: [],
      loading: false,
      error: null,
    },

    reducers: {},

    extraReducers: (builder) => {
      builder

        .addCase(
          fetchUsers.pending,
          (state) => {
            state.loading = true;
          }
        )

        .addCase(
          fetchUsers.fulfilled,
          (state, action) => {
            state.loading = false;
            state.users = action.payload;
          }
        )

        .addCase(
          fetchUsers.rejected,
          (state, action) => {
            state.loading = false;
            state.error =
              action.payload;
          }
        )

        .addCase(
          updateUserStatus.fulfilled,
          (state, action) => {
            const index =
              state.users.findIndex(
                (user) =>
                  user.id ===
                  action.payload.id
              );

            if (index !== -1) {
              state.users[index] =
                action.payload;
            }
          }
        );
    },
  });

export default adminUserSlice.reducer;