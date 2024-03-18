import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createUserAPI } from './authAPI';

const initialState = {
  loggedInUser: null,
  status: 'idle',
};

export const createUserAsync = createAsyncThunk(
  'auth/createUserAsync',
  async (userData) => {
    const response = await createUserAPI(userData);
    return response.data;
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUser = action.payload;
      });
  },
});


export default authSlice.reducer;
