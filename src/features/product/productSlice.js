import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchAllProductsAPI, fetchProductBySortAPI, fetchProductsByFilterAPI, fetchProductsByPaginationAPI } from './productAPI';

const initialState = {
  products: [],
  status: 'idle',
  totalItems : 0
};

export const fetchAllProductsAsync = createAsyncThunk(
  'product/fetchAllProductsAsync',
  async () => {
    const response = await fetchAllProductsAPI();
    return response.data;
  }
);

export const fetchProductsByFilterAsync = createAsyncThunk(
  'product/fetchProductsByFilterAsync',
  async ({filter,sort,pagination}) => {
    const response = await fetchProductsByFilterAPI(filter,sort,pagination);
    return response.data;
  }
);


export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProductsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products = action.payload;
      })
      .addCase(fetchProductsByFilterAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductsByFilterAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products = action.payload.products;
        state.totalItems = action.payload.totalItems;
      });
  },
});

export const { increment } = productSlice.actions;

export default productSlice.reducer;
