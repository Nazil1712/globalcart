import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../features/product/productslice';
import authReducer from '../features/auth/authslice'
import cartReducer from "../features/cart/cartslice"
import orderReducer from "../features/order/orderslice"
import userReducer from "../features/user/userslice"

export const store = configureStore({
  reducer: {
    product: productReducer,
    auth: authReducer,
    cart: cartReducer,
    order: orderReducer,
    user : userReducer
  },
});
