import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addToWishlistAPI,
  deleteFromWishlistAPI,
  fetchWishlistByUserAPI,
} from "./wishlistAPI";

const initialState = {
  items: [],
  status: "idle",
};

export const addToWishlistAsync = createAsyncThunk(
  "wishlist/addToWishlistAsync",
  async (product) => {
    const response = await addToWishlistAPI({ productId: product.id });
    return { ...response.data, populatedProduct: product };
  },
);

export const fetchWishlistByUserAsync = createAsyncThunk(
  "wishlist/fetchWishlistByUserAsync",
  async () => {
    const response = await fetchWishlistByUserAPI();
    return response.data;
  },
);

export const deleteFromWishlistAsync = createAsyncThunk(
  "wishlist/deleteFromWishlistAsync",
  async (productId) => {
    const response = await deleteFromWishlistAPI(productId);
    return { productId, ...response.data };
  },
);

export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToWishlistAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addToWishlistAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.items.push({
          ...action.payload.data,
          product: action.payload.populatedProduct,
        });
      })
      .addCase(fetchWishlistByUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchWishlistByUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.items = action.payload.data;
      })
      .addCase(deleteFromWishlistAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteFromWishlistAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.items.findIndex((item) => {
          // item.product could be an object (populated) or just an ID.
          const prodId = item.product.id || item.product;
          return prodId === action.payload.productId;
        });
        if (index >= 0) {
          state.items.splice(index, 1);
        }
      });
  },
});

export default wishlistSlice.reducer;
