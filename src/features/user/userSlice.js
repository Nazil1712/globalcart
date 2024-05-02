import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchUserordersAPI } from './userapi';

const initialState = {
  Userorders: [],
  status: 'idle',
};

export const fetchUserordersAsync = createAsyncThunk(
  'user/fetchUserordersAsync',
  async (userId) => {
    const response = await fetchUserordersAPI(userId);
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
        state.Userorders = action.payload;
      });
  },
});

export const selectUserorders = (state)=>state.user.Userorders

export default userslice.reducer;
