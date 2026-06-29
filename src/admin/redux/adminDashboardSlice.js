import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:3000";

export const fetchAdminDashboardData = createAsyncThunk(
  "adminDashboard/fetchAdminDashboardData",
  async (_, thunkAPI) => {
    try {
      const [productsRes, usersRes, ordersRes] =
        await Promise.all([
          axios.get(`${API_URL}/products`),
          axios.get(`${API_URL}/users`),
          axios.get(`${API_URL}/orders`),
        ]);

      const totalRevenue =
        ordersRes.data.reduce(
          (total, order) =>
            total + Number(order.total || 0),
          0
        );

      return {
        totalProducts: productsRes.data.length,
        totalUsers: usersRes.data.length,
        totalOrders: ordersRes.data.length,
        totalRevenue,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.message
      );
    }
  }
);

const initialState = {
  totalProducts: 0,
  totalUsers: 0,
  totalOrders: 0,
  totalRevenue: 0,
  loading: false,
  error: null,
};

const adminDashboardSlice = createSlice({
  name: "adminDashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminDashboardData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdminDashboardData.fulfilled, (state, action) => {
  state.loading = false;
  state.totalProducts = action.payload.totalProducts;
  state.totalUsers = action.payload.totalUsers;
  state.totalOrders = action.payload.totalOrders;
  state.totalRevenue = action.payload.totalRevenue;
})
      .addCase(fetchAdminDashboardData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default adminDashboardSlice.reducer;