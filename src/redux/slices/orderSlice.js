import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import orderService from "../../services/orderService";

export const placeOrder = createAsyncThunk(
  "orders/placeOrder",

  async (orderData, thunkAPI) => {
    try {
      return await orderService.placeOrder(orderData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const fetchOrders = createAsyncThunk(
  "orders/fetchOrders",

  async (userId, thunkAPI) => {
    try {
      return await orderService.getOrders(userId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

const initialState = {
  orders: [],
  loading: false,
  error: null,
};

const orderSlice = createSlice({
  name: "orders",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(placeOrder.pending, (state) => {
        state.loading = true;
      })

      .addCase(placeOrder.fulfilled, (state, action) => {
        state.loading = false;

        state.orders.unshift(action.payload);
      })

      .addCase(placeOrder.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      })

      // Fetch Orders

      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;

        state.orders = action.payload;
      })

      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      });
  },
});

export default orderSlice.reducer;
