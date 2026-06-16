import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import productService from "../../services/productService";

export const fetchProducts =
  createAsyncThunk(
    "products/fetchProducts",

    async (_, thunkAPI) => {
      try {
        return await productService.getProducts();
      } catch (error) {
        return thunkAPI.rejectWithValue(
          error.message
        );
      }
    }
  );

const initialState = {
  products: [],
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: "products",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(
        fetchProducts.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        fetchProducts.fulfilled,
        (state, action) => {
          state.loading = false;
          state.products =
            action.payload;
        }
      )

      .addCase(
        fetchProducts.rejected,
        (state, action) => {
          state.loading = false;
          state.error =
            action.payload;
        }
      );
  },
});

export default productSlice.reducer;