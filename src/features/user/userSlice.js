import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchUserordersAPI, updateUserAPI, fetchLoggedInUserAPI } from './userapi';

const initialState = {
  userInfo : null,
  orders: [],
  status: 'idle',
};

export const fetchUserordersAsync = createAsyncThunk(
  'user/fetchUserordersAsync',
  async (userId) => {
    const response = await fetchUserordersAPI(userId);
    return response.data;
  }
);


export const fetchLoggedInUserAsync = createAsyncThunk(
  'user/fetchLoggedInUserAsync',
  async (userId) =>{
    const response  = await fetchLoggedInUserAPI(userId);
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
      .addCase(fetchUserordersAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserordersAsync.fulfilled, (state, action) => {
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
      .addCase(fetchLoggedInUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLoggedInUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.userInfo = action.payload;
      })
      ;
  },
});


export default userslice.reducer;
