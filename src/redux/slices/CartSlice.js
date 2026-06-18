import { createSlice } from "@reduxjs/toolkit";

const cartItems =
  JSON.parse(
    localStorage.getItem("cart")
  ) || [];

const initialState = {
  cartItems,
};

const cartSlice = createSlice({
  name: "cart",

  initialState,

  reducers: {
    addToCart: (
      state,
      action
    ) => {
      state.cartItems.push(
        action.payload
      );

      localStorage.setItem(
        "cart",
        JSON.stringify(
          state.cartItems
        )
      );
    },

    removeFromCart: (
      state,
      action
    ) => {
      state.cartItems =
        state.cartItems.filter(
          (item) =>
            item.id !==
            action.payload
        );

      localStorage.setItem(
        "cart",
        JSON.stringify(
          state.cartItems
        )
      );
    },

    clearCart: (
      state
    ) => {
      state.cartItems = [];

      localStorage.removeItem(
        "cart"
      );
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;