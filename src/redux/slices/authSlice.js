import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../../services/authService";

let user = null;

try {
  const storedUser =
    localStorage.getItem("user");

  user = storedUser
    ? JSON.parse(storedUser)
    : null;
} catch (error) {
  localStorage.removeItem(
    "user"
  );
  user = null;
}

const initialState = {
    user:user || null,
    isAuthenticated: !!user,
    loading :false,
    error:null,
}



export const registerUser =
  createAsyncThunk(
    "auth/registerUser",

    async (
      userData,
      thunkAPI
    ) => {
      try {
        return await authService.register(
          userData
        );
      } catch (error) {
        return thunkAPI.rejectWithValue(
          error.message
        );
      }
    }
  );




export const loginUser =
  createAsyncThunk(
    "auth/loginUser",
    async (
      credentials,
      thunkAPI
    ) => {
      try {
        const user =
          await authService.login(
            credentials.email,
            credentials.password
          );

        localStorage.setItem(
          "user",
          JSON.stringify(user)
        );

        return user;
      } catch (error) {
        return thunkAPI.rejectWithValue(
          error.message
        );
      }
    }
  );






  const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
   logout: (state) => {
  localStorage.removeItem("user");

  state.user = null;
  state.isAuthenticated = false;
},
  },

  extraReducers: (
    builder
  ) => {
    builder

      // Register
      .addCase(
        registerUser.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        registerUser.fulfilled,
        (state) => {
          state.loading = false;
        }
      )

      .addCase(
        registerUser.rejected,
        (
          state,
          action
        ) => {
          state.loading = false;
          state.error =
            action.payload;
        }
      )

      // Login
      .addCase(
        loginUser.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        loginUser.fulfilled,
        (
          state,
          action
        ) => {
          state.loading = false;

          state.user =
            action.payload;

          state.isAuthenticated = true;
        }
      )

      .addCase(
        loginUser.rejected,
        (
          state,
          action
        ) => {
          state.loading = false;

          state.error =
            action.payload;
        }
      );
  },
});

export const { logout } =
  authSlice.actions;

export default authSlice.reducer;
