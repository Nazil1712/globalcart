import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addToCartAPI, deleteFromCartAPI, fetchCartByUserAPI, resetCartAPI, updateCartAPI } from './CartAPI';

const initialState = {
  items : [],
  status: 'idle',
};

export const addToCartAsync = createAsyncThunk(
  'cart/addToCartAsync',
  async (item) => {
    // console.log("Item from Add Async",item)
    const response = await addToCartAPI(item);
    return response.data;
  }
);

export const fetchCartByUserAsync = createAsyncThunk(
  'cart/fetchCartByUserAsync',
  async () => {
    const response = await fetchCartByUserAPI();
    return response.data;
  }
);

export const updateCartAsync = createAsyncThunk(
  'cart/updateCartAsync',
  async (update) => {
    const response = await updateCartAPI(update);
    return response.data;
  }
);

export const deleteFromCartAsync = createAsyncThunk(
  'cart/deleteFromCartAsync',
  async (id) => {
    const response = await deleteFromCartAPI(id);
    return response.data;
  }
);

export const resetCartAsync = createAsyncThunk(
  'cart/resetCartAsync',
  async () => {
    const response = await resetCartAPI();
    return response.data;
  }
);

export const cartslice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items.push(action.payload);
      })
      .addCase(fetchCartByUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCartByUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items = action.payload;
      })
      .addCase(updateCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateCartAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        // console.log("Items from Redux",action.payload)
        const index = state.items.findIndex((item)=>item.id===action.payload.id)
        state.items[index] = action.payload
      })
      .addCase(deleteFromCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteFromCartAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        // console.log(action.payload)
        const index = state.items.findIndex((item)=>item.id===action.payload.id)
        state.items.splice(index,1);
      })
      .addCase(resetCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(resetCartAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items = []
      })
  },
});


export default cartslice.reducer;
