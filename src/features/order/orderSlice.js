import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createOrderAPI } from './orderapi';

const initialState = {
  orders: [],
  status: 'idle',
  currentOrder : null,
};

export const createOrderAsync = createAsyncThunk(
  'order/createOrderAsync',
  async (order) => {
    const response = await createOrderAPI(order);
    return response.data;
  }
);

export const orderslice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    resetCurrentOrder:(state,action)=>{
      state.currentOrder = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrderAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createOrderAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.orders.push(action.payload);
        state.currentOrder = action.payload
      });
  },
});

export const {resetCurrentOrder} = orderslice.actions;

export const selectCount = (state) => state.counter.value;

export default orderslice.reducer;
