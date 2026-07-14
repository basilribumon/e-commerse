import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import adminService from "../../services/adminService";

export const loginAdmin = createAsyncThunk(
  "admin/loginAdmin",
  async (credentials, thunkAPI) => {
    try {
      return await adminService.loginAdmin(credentials);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
const adminSlice = createSlice({
  name: "admin",

  initialState: {
    admin: null,
    isAuthenticated: false,
    isLoading: false,
    isError: false,
    message: "",
  },

  reducers: {
    logoutAdmin(state) {
      state.admin = null;
      state.isAuthenticated = false;
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(loginAdmin.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(loginAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.admin = action.payload;
      })

      .addCase(loginAdmin.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { logoutAdmin } = adminSlice.actions;
export default adminSlice.reducer;
