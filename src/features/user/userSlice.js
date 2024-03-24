import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchUserOrdersAPI } from './userAPI';

const initialState = {
  userOrders: [],
  status: 'idle',
};

export const fetchUserOrdersAsync = createAsyncThunk(
  'user/fetchUserOrdersAsync',
  async (userId) => {
    const response = await fetchUserOrdersAPI(userId);
    return response.data;
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserOrdersAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserOrdersAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.userOrders = action.payload;
      });
  },
});

export const selectUserOrders = (state)=>state.user.userOrders

export default userSlice.reducer;
