import { createSlice } from "@reduxjs/toolkit";

const getCartItems = () => {
  const user = JSON.parse(
    localStorage.getItem("user")
  );

  if (!user) return [];

  return (
    JSON.parse(
      localStorage.getItem(
        `cart_${user.id}`
      )
    ) || []
  );
};

const initialState = {
  cartItems: getCartItems(),
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

      const user =
        JSON.parse(
          localStorage.getItem(
            "user"
          )
        );

      localStorage.setItem(
        `cart_${user.id}`,
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

      const user =
        JSON.parse(
          localStorage.getItem(
            "user"
          )
        );

      localStorage.setItem(
        `cart_${user.id}`,
        JSON.stringify(
          state.cartItems
        )
      );
    },

    clearCart: (
      state
    ) => {
      state.cartItems = [];

      const user =
        JSON.parse(
          localStorage.getItem(
            "user"
          )
        );

      localStorage.removeItem(
        `cart_${user.id}`
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