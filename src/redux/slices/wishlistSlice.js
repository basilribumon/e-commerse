import { createSlice } from "@reduxjs/toolkit";

const getWishlistItems = () => {
  const user = JSON.parse(
    localStorage.getItem("user")
  );

  if (!user) return [];

  return (
    JSON.parse(
      localStorage.getItem(
        `wishlist_${user.id}`
      )
    ) || []
  );
};

const initialState = {
  wishlistItems:
    getWishlistItems(),
};

const wishlistSlice =
  createSlice({
    name: "wishlist",

    initialState,

    reducers: {
      addToWishlist: (
        state,
        action
      ) => {
        const exists =
          state.wishlistItems.find(
            (item) =>
              item.id ===
              action.payload.id
          );

        if (!exists) {
          state.wishlistItems.push(
            action.payload
          );

          const user =
            JSON.parse(
              localStorage.getItem(
                "user"
              )
            );

          if (user) {
            localStorage.setItem(
              `wishlist_${user.id}`,
              JSON.stringify(
                state.wishlistItems
              )
            );
          }
        }
      },

      removeFromWishlist: (
        state,
        action
      ) => {
        state.wishlistItems =
          state.wishlistItems.filter(
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

        if (user) {
          localStorage.setItem(
            `wishlist_${user.id}`,
            JSON.stringify(
              state.wishlistItems
            )
          );
        }
      },

      clearWishlist: (
        state
      ) => {
        state.wishlistItems =
          [];

        const user =
          JSON.parse(
            localStorage.getItem(
              "user"
            )
          );

        if (user) {
          localStorage.removeItem(
            `wishlist_${user.id}`
          );
        }
      },

      loadWishlist: (
        state
      ) => {
        const user =
          JSON.parse(
            localStorage.getItem(
              "user"
            )
          );

        state.wishlistItems =
          JSON.parse(
            localStorage.getItem(
              `wishlist_${user.id}`
            )
          ) || [];
      },
    },
  });

export const {
  addToWishlist,
  removeFromWishlist,
  clearWishlist,
  loadWishlist,
} = wishlistSlice.actions;

export default wishlistSlice.reducer;