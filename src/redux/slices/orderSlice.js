import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    cartItems: [],
  },
  reducers: {},
});

export default orderSlice.reducer;