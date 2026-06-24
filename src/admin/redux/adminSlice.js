import { createSlice } from "@reduxjs/toolkit";

const admin =
  JSON.parse(localStorage.getItem("admin")) || null;

const initialState = {
  admin,
  isAuthenticated: !!admin,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,

  reducers: {
    loginAdmin: (state, action) => {
      state.admin = action.payload;
      state.isAuthenticated = true;

      localStorage.setItem(
        "admin",
        JSON.stringify(action.payload)
      );
    },

    logoutAdmin: (state) => {
      state.admin = null;
      state.isAuthenticated = false;

      localStorage.removeItem("admin");
    },
  },
});

export const { loginAdmin, logoutAdmin } =
  adminSlice.actions;

export default adminSlice.reducer;