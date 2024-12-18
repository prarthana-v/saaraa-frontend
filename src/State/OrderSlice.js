import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const apiurl = import.meta.env.VITE_API_URL;

export const fetchOrders = createAsyncThunk(
  "orders/fetchOrdersbyseller",
  async ({ page, limit }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${apiurl}/orders/getordersbyseller`, {
        params: { page, limit },
        withCredentials: true,
      });
      return response.data; // Assuming the response includes orders and pagination data
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch orders");
    }
  }
);

// Async thunk to place an order
export const placeOrder = createAsyncThunk(
  "orders/placeOrder",
  async (orderData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${apiurl}/orders/place-order`,
        orderData,
        { withCredentials: true }
      );
      console.log(response.data, "rd");
      return response.data; // Assuming the backend sends success data
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response?.data || "Failed to place order");
    }
  }
);

// Define initial state
const initialState = {
  orders: [],
  orderDetails: null, // Stores details of the placed order
  loading: false,
  error: null,
  page: 1, // Current page
  rowsPerPage: 10, // Items per page
  totalPages: 0, // Total number of pages
  totalOrders: 0, // Total number of orders
};

// Create the slice
const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    resetPlaceOrderState: (state) => {
      state.placingOrder = false;
      state.placeOrderError = null;
      state.success = false;
      state.orderDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload.orders;
        state.totalPages = action.payload.pagination.totalPages;
        state.totalOrders = action.payload.pagination.totalOrders;
        state.page = action.payload.pagination.currentPage; // Update current page
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Place Order
      .addCase(placeOrder.pending, (state) => {
        state.placingOrder = true;
        state.placeOrderError = null;
        state.success = false;
      })
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.placingOrder = false;
        state.success = true;
        state.orderDetails = action.payload;
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.placingOrder = false;
        state.placeOrderError = action.payload;
      });
  },
});

export const { resetPlaceOrderState } = ordersSlice.actions;
export default ordersSlice.reducer;
