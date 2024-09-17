import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { checkUserAPI, createUserAPI, signOutAPI } from './authapi';

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


export const signOutAsync = createAsyncThunk(
  'auth/signOutAsync',
  async (userId) => {
    const response = await signOutAPI(userId);
    return response.data;
  }
);

export const authslice = createSlice({
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
      .addCase(signOutAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(signOutAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUser = null;
      });;
  },
});


export default authslice.reducer;
