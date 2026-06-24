import { configureStore } from "@reduxjs/toolkit";

import productReducer from "./slices/ProductSlice";
import authReducer from "./slices/authSlice";
import cartReducer from "./slices/CartSlice";
import wishlistReducer from "./slices/wishlistSlice";
import orderReducer from "./slices/orderSlice";
import adminReducer from "../admin/redux/adminSlice"
import adminDashboardReducer from "../admin/redux/adminDashboardSlice";


export const store = configureStore({
  reducer: {
    products: productReducer,
    auth: authReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
    orders: orderReducer,
    admin:adminReducer,
    adminDashboard: adminDashboardReducer,
  },
});