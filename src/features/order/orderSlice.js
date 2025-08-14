import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createOrderAPI, fetchAllOrdersAPI, updateOrderAPI } from './orderAPI';

const initialState = {
  orders: [],
  status: 'idle',
  currentOrder : null,
  totalOrders : 0,
  ordersLoaded: false
};

export const createOrderAsync = createAsyncThunk(
  'order/createOrderAsync',
  async (order) => {
    const response = await createOrderAPI(order);
    return response.data;
  }
);


export const fetchAllOrdersAsync = createAsyncThunk(
  'order/fetchAllOrdersAsync',
  async ({sort, pagination}) => {
    const response = await fetchAllOrdersAPI(sort, pagination);
    return response.data;
  }
);

export const updateOrderAsync = createAsyncThunk(
  'order/updateOrderAsync',
  async (order) => {
    const response = await updateOrderAPI(order);
    return response.data;
  }
);

export const orderSlice = createSlice({
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
        // console.log("CurrentOrder",state.currentOrder)
      })
      .addCase(fetchAllOrdersAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllOrdersAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.orders = action.payload.orders;
        state.totalOrders = action.payload.total_Orders
      })
      .addCase(updateOrderAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateOrderAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index = state.orders.findIndex((v,i,arr)=>v.id===action.payload.id)
        state.orders[index] = action.payload
      });
  },
});

export const {resetCurrentOrder} = orderSlice.actions;

export const selectCount = (state) => state.counter.value;

export default orderSlice.reducer;
