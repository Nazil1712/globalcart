import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchOrderByUserAPI, updateUserAPI, fetchloggedInUserAPI } from './userapi';

const initialState = {
  userInfo : null,
  orders: [],
  status: 'idle',
};

export const fetchOrderByUserAsync = createAsyncThunk(
  'user/fetchOrderByUserAsync',
  async () => {
    const response = await fetchOrderByUserAPI();
    return response.data;
  }
);


export const fetchloggedInUserAsync = createAsyncThunk(
  'user/fetchloggedInUserAsync',
  async () =>{
    const response  = await fetchloggedInUserAPI();
    return response.data;
  }
)

export const updateUserAsync = createAsyncThunk(
  'auth/updateUserAsync',
  async (update) => {
    const response = await updateUserAPI(update);
    return response.data;
  }
);


export const userslice = createSlice({
  name: 'user',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrderByUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchOrderByUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.userInfo.orders = action.payload;
      })
      .addCase(updateUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.userInfo = action.payload;
      })
      .addCase(fetchloggedInUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchloggedInUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.userInfo = action.payload;
      })
      ;
  },
});


export default userslice.reducer;
