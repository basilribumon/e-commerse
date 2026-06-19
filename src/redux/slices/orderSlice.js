import { createSlice } from "@reduxjs/toolkit";

const getOrders = () => {
  const user = JSON.parse(
    localStorage.getItem("user")
  );

  if (!user) return [];

  return (
    JSON.parse(
      localStorage.getItem(
        `orders_${user.id}`
      )
    ) || []
  );
};

const initialState = {
  orders: getOrders(),
};

const orderSlice = createSlice({
  name: "orders",
  initialState,

  reducers: {
    addOrder: (
      state,
      action
    ) => {
      state.orders.unshift(
        action.payload
      );

      const user = JSON.parse(
        localStorage.getItem("user")
      );

      localStorage.setItem(
        `orders_${user.id}`,
        JSON.stringify(
          state.orders
        )
      );
    },

    clearOrders: (state) => {
      state.orders = [];

      const user = JSON.parse(
        localStorage.getItem("user")
      );

      localStorage.removeItem(
        `orders_${user.id}`
      );
    },

    loadOrders: (state) => {
      const user = JSON.parse(
        localStorage.getItem("user")
      );

      state.orders =
        JSON.parse(
          localStorage.getItem(
            `orders_${user.id}`
          )
        ) || [];
    },
  },
});

export const {
  addOrder,
  clearOrders,
  loadOrders,
} = orderSlice.actions;

export default orderSlice.reducer;