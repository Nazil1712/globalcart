import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addToCartAPI, deleteItemAPI, fetchItemsByUserIdAPI, updateItemAPI } from './cartAPI';

const initialState = {
  items : [],
  status: 'idle',
};

export const addToCartAsync = createAsyncThunk(
  'cart/addToCartAsync',
  async (item) => {
    const response = await addToCartAPI(item);
    return response.data;
  }
);

export const fetchItemsByUserIdAsync = createAsyncThunk(
  'cart/fetchItemsByUserIdAsync',
  async (userId) => {
    const response = await fetchItemsByUserIdAPI(userId);
    return response.data;
  }
);

export const updateItemAsync = createAsyncThunk(
  'cart/updateItemAsync',
  async (update) => {
    const response = await updateItemAPI(update);
    return response.data;
  }
);

export const deleteItemAsync = createAsyncThunk(
  'cart/deleteItemAsync',
  async (id) => {
    const response = await deleteItemAPI(id);
    return response.data;
  }
);

export const cartSlice = createSlice({
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
      .addCase(fetchItemsByUserIdAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchItemsByUserIdAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items = action.payload;
      })
      .addCase(updateItemAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateItemAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index = state.items.findIndex((item)=>item.id===action.payload.id)
        state.items[index] = action.payload
      })
      .addCase(deleteItemAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteItemAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        console.log(action.payload)
        const index = state.items.findIndex((item)=>item.id===action.payload.id)
        state.items.splice(index,1);
      });
  },
});


export default cartSlice.reducer;
