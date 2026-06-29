import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import axios from "axios";

const API =
  "http://localhost:3000/products";

// Fetch Products
export const deleteProduct = createAsyncThunk(
  "adminProducts/deleteProduct",

  async (id, thunkAPI) => {
    try {
      await axios.delete(
        `http://localhost:3000/products/${id}`
      );

      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.message
      );
    }
  }
);

export const updateProduct = createAsyncThunk(
  "adminProducts/updateProduct",

  async (product, thunkAPI) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/products/${product.id}`,
        product
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.message
      );
    }
  }
);
export const addProduct = createAsyncThunk(
  "adminProducts/addProduct",

  async (product, thunkAPI) => {
    try {
      const response =
        await axios.post(
          API,
          product
        );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.message
      );
    }
  }
);

export const fetchProducts =
  createAsyncThunk(
    "adminProducts/fetchProducts",

    async (_, thunkAPI) => {
      try {
        const response =
          await axios.get(API);

        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(
          error.message
        );
      }
    }
  );

const adminProductSlice =
  createSlice({
    name: "adminProducts",

    initialState: {
      products: [],
      loading: false,
      error: null,
    },

    reducers: {},

    extraReducers: (
      builder
    ) => {
      builder

      .addCase(
  deleteProduct.fulfilled,
  (state, action) => {
    state.products =
      state.products.filter(
        (product) =>
          product.id !== action.payload
      );
  }
)
        .addCase(
  updateProduct.fulfilled,
  (state, action) => {
    const index =
      state.products.findIndex(
        (product) =>
          product.id === action.payload.id
      );

    if (index !== -1) {
      state.products[index] =
        action.payload;
    }
  }
)
        .addCase(
  addProduct.fulfilled,
  (state, action) => {
    state.products.push(
      action.payload
    );
  }
)

        .addCase(
          fetchProducts.pending,
          (state) => {
            state.loading = true;
          }
        )

        .addCase(
          fetchProducts.fulfilled,
          (
            state,
            action
          ) => {
            state.loading =
              false;

            state.products =
              action.payload;
          }
        )

        .addCase(
          fetchProducts.rejected,
          (
            state,
            action
          ) => {
            state.loading =
              false;

            state.error =
              action.payload;
          }
          
        );
        
    },
  });

export default adminProductSlice.reducer;