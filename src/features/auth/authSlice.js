import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginUserAPI, createUserAPI, signOutAPI, checkAuthAPI } from "./authapi";

const initialState = {
  loggedInUserToken: null,
  status: "idle",
  error: null,
  userChecked: false
};

export const createUserAsync = createAsyncThunk(
  "auth/createUserAsync",
  async (userData) => {
    const response = await createUserAPI(userData);
    return response.data;
  }
);

export const loginUserAsync = createAsyncThunk(
  "auth/loginUserAsync",
  async (loginInfo, { rejectWithValue }) => {
    try {
      const response = await loginUserAPI(loginInfo);
      return response.data;
    } catch (error) {
      // console.log(error);
      return rejectWithValue(error);
    }
  }
);

export const checkAuthAsync = createAsyncThunk(
  'auth/checkAuthAsync',
  async () =>{
    try{
      const response = await checkAuthAPI();
      return response.data
    }
    catch(error) {
      return 
      // return rejectWithValue(error)
    }
  }
)

export const signOutAsync = createAsyncThunk("auth/signOutAsync", async () => {
  const response = await signOutAPI();
  return response.data;
});

export const authslice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUserToken = action.payload;
      })
      .addCase(loginUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUserToken = action.payload;
      })
      .addCase(loginUserAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.error;
      })
      .addCase(signOutAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signOutAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUserToken = null;
      })
      .addCase(checkAuthAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(checkAuthAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUserToken = action.payload;
        state.userChecked = true
      })
      .addCase(checkAuthAsync.rejected, (state, action) => {
        state.status = "idle";
        state.userChecked = true
      })
      ;
  },
});

export default authslice.reducer;
