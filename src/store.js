// src/app/store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../src/State/SellerAuthSlice";
import categoryReducer from "./State/CategorySlice";
import userAuthReducer from "./State/UserAuthSlice";
import productReducer from "./State/ProductSlice";
import ordersReducer from "./State/OrderSlice";

export const Store = configureStore({
  reducer: {
    auth: authReducer,
    userauth: userAuthReducer,
    category: categoryReducer,
    products: productReducer,
    orders: ordersReducer,
  },
});
