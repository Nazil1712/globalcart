import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { checkUserAPI, createUserAPI, updateUserAPI } from './authAPI';

const initialState = {
  loggedInUser: null,
  status: 'idle',
  error : null
};

export const createUserAsync = createAsyncThunk(
  'auth/createUserAsync',
  async (userData) => {
    const response = await createUserAPI(userData);
    return response.data;
  }
);

export const checkUserAsync = createAsyncThunk(
  'auth/checkUserAsync',
  async (loginInfo) => {
    const response = await checkUserAPI(loginInfo);
    return response.data;
  }
);

export const updateUserAsync = createAsyncThunk(
  'auth/updateUserAsync',
  async (update) => {
    const response = await updateUserAPI(update);
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
      })
      .addCase(checkUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(checkUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUser = action.payload;
      })
      .addCase(checkUserAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.error;
      })
      .addCase(updateUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        console.log(action.payload)
        state.loggedInUser = action.payload;
      });
  },
});


export default authSlice.reducer;
