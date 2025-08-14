import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchOrderByUserAPI,
  updateUserAPI,
  fetchloggedInUserAPI,
} from "./userAPI";

const initialState = {
  userInfo: null,
  orders: [],
  status: "idle",
  userLoaded : false,
};

export const fetchOrderByUserAsync = createAsyncThunk(
  "user/fetchOrderByUserAsync",
  async () => {
    const response = await fetchOrderByUserAPI();
    return response.data;
  }
);

export const fetchloggedInUserAsync = createAsyncThunk(
  "user/fetchloggedInUserAsync",
  async () => {
    const response = await fetchloggedInUserAPI();
    return response.data;
  }
);

export const updateUserAsync = createAsyncThunk(
  "auth/updateUserAsync",
  async (update) => {
    const response = await updateUserAPI(update);
    return response.data;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrderByUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchOrderByUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        console.log("User INfo from IMp",state.userInfo)
        state.userInfo.orders = action.payload;
      })
      .addCase(updateUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.userInfo = action.payload;
      })
      .addCase(fetchloggedInUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchloggedInUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.userInfo = action.payload;
        // console.log("user Info",state.userInfo)
        state.userLoaded = true;
      })
      .addCase(fetchloggedInUserAsync.rejected, (state, action) => {
        state.status = "idle";
        state.userLoaded = true;
      });
  },
});

export default userSlice.reducer;
