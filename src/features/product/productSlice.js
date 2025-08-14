import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createProductAPI, fetchAllBrandsAPI, fetchAllCategoriesAPI, fetchAllProductsAPI, fetchProductByIdAPI, fetchProductsByFilterAPI, updateProductAPI } from './productAPI';

const initialState = {
  products: [],
  categories:[],
  brands:[],
  selectedProduct : null,
  status: 'idle',
  totalItems : 0,
};


export const fetchProductsByFilterAsync = createAsyncThunk(
  'product/fetchProductsByFilterAsync',
  async ({filter,sort,pagination,admin}) => {
    const response = await fetchProductsByFilterAPI(filter,sort,pagination,admin);
    return response.data;
  }
);
export const fetchAllCategoriesAsync = createAsyncThunk(
  'product/fetchAllCategoriesAsync',
  async () => {
    const response = await fetchAllCategoriesAPI();
    return response.data;
  }
);
export const fetchAllBrandsAsync = createAsyncThunk(
  'product/fetchAllBrandsAsync',
  async () => {
    const response = await fetchAllBrandsAPI();
    return response.data;
  }
);
export const fetchProductByIdAsync = createAsyncThunk(
  'product/fetchProductByIdAsync',
  async (id) => {
    const response = await fetchProductByIdAPI(id);
    return response.data;
  }
);

export const createProductAsync = createAsyncThunk(
  "product/createProductAsync",
  async (product) => {
    // console.log(product)
    const response = await createProductAPI(product);
    return response.data;
  }
);

export const updateProductAsync = createAsyncThunk(
  "product/updateProductAsync",
  async (update) => {
    // for(let i in update) {
    //   console.log(i,update[i])
    // }
    const response = await updateProductAPI(update);
    // console.log(response)
    return response.data;
  }
);



export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsByFilterAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductsByFilterAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products = action.payload.products;
        state.totalItems = action.payload.totalItems;
      })
      .addCase(fetchAllCategoriesAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllCategoriesAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.categories = action.payload;
      })
      .addCase(fetchAllBrandsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllBrandsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.brands = action.payload;
      })
      .addCase(fetchProductByIdAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductByIdAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.selectedProduct = action.payload;
      })
      .addCase(createProductAsync.pending, (state) => {
        state.status = "pending";
      })
      .addCase(createProductAsync.fulfilled, (state, action) => {
        state.products.push(action.payload);
      })
      .addCase(updateProductAsync.pending, (state) => {
        state.status = "pending";
      })
      .addCase(updateProductAsync.fulfilled, (state, action) => {
        const index = state.products.findIndex((v,i,arr)=>v.id===action.payload.id)
        state.products[index] = action.payload;
        state.selectedProduct = action.payload
      });
      ;
  },
});

export const { increment } = productSlice.actions;

export default productSlice.reducer;
