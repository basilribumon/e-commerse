import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import orderService from "../../services/orderService";

// Fetch All Orders
export const fetchAllOrders =
  createAsyncThunk(
    "adminOrders/fetchAllOrders",

    async (_, thunkAPI) => {
      try {
        return await orderService.getAllOrders();
      } catch (error) {
        return thunkAPI.rejectWithValue(
          error.message
        );
      }
    }
  );

// Update Order Status
export const updateOrderStatus =
  createAsyncThunk(
    "adminOrders/updateOrderStatus",

    async (order, thunkAPI) => {
      try {
        return await orderService.updateOrder(
          order
        );
      } catch (error) {
        return thunkAPI.rejectWithValue(
          error.message
        );
      }
    }
  );

const adminOrderSlice =
  createSlice({
    name: "adminOrders",

    initialState: {
      orders: [],
      loading: false,
      error: null,
    },

    reducers: {},

    extraReducers: (builder) => {
      builder

        .addCase(
          fetchAllOrders.pending,
          (state) => {
            state.loading = true;
          }
        )

        .addCase(
          fetchAllOrders.fulfilled,
          (state, action) => {
            state.loading = false;
            state.orders =
              action.payload;
          }
        )

        .addCase(
          fetchAllOrders.rejected,
          (state, action) => {
            state.loading = false;
            state.error =
              action.payload;
          }
        )

        .addCase(
          updateOrderStatus.fulfilled,
          (state, action) => {
            const index =
              state.orders.findIndex(
                (order) =>
                  order.id ===
                  action.payload.id
              );

            if (index !== -1) {
              state.orders[index] =
                action.payload;
            }
          }
        );
    },
  });

export default adminOrderSlice.reducer;