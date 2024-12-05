// src/redux/cartSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const apiurl = import.meta.env.VITE_API_URL;
import Cookies from "js-cookie";

// Async thunk for adding to cart
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (item, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${apiurl}/cart/add-item`, item, {
        withCredentials: true,
      });
      if (!response.data.success) {
        // Assuming response.data contains success property
        return rejectWithValue("Failed to add item to cart");
      }
      console.log("cart response", response.data);
      return response.data;
    } catch (error) {
      console.error("Add to cart error:", error);
      // Extracting and returning a simple error message
      return rejectWithValue(error.response || "Something went wrong");
    }
  }
);

// Async thunk to fetch cart items
export const fetchCartItems = createAsyncThunk(
  "cart/fetchCartItems",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${apiurl}/cart/getcart`, {
        withCredentials: true,
      }); // Replace with your actual endpoint
      console.log(response.data, "cart response");
      return response.data;
    } catch (error) {
      console.error("Fetch cart items error:", error);
      return rejectWithValue(error.response);
    }
  }
);

export const removeCartItem = createAsyncThunk(
  "cart/removeCartItem",
  async (itemId, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.delete(`${apiurl}/cart/delete-item`, {
        data: { id: itemId },
        withCredentials: true,
      });

      // Assuming the backend returns the updated cart object
      if (response.data.success) {
        dispatch(removeFromCart(itemId)); // Dispatch action to remove item from state
      }

      return response.data; // Optional: You can return updated data if needed
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [], // Array of cart items
    totalQuantity: 0,
    totalPrice: 0,
    loading: false,
    error: null, // For storing error messages
  },
  reducers: {
    removeFromCart: (state, action) => {
      const id = action.payload;
      const existingItem = state.cartItems.find((item) => item.id === id);
      if (existingItem) {
        state.totalQuantity -= existingItem.quantity;
        state.totalPrice -= existingItem.totalPrice;
        state.cartItems = state.cartItems.filter((item) => item.id !== id);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Pending state
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
        state.error = null; // Clear any previous errors
      })
      // Fulfilled state
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        const newItem = action.payload;
        const existingItem = state.cartItems.find(
          (item) => item.id === newItem.id
        );

        if (existingItem) {
          existingItem.quantity += newItem.quantity;
          existingItem.totalPrice += newItem.price * newItem.quantity;
        } else {
          state.cartItems.push({
            ...newItem,
            totalPrice: newItem.price * newItem.quantity,
          });
        }
        state.totalQuantity += newItem.quantity;
        state.totalPrice += newItem.price * newItem.quantity;
        // Show success toast
      })
      // Rejected state
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
        // toast.error(action.payload || "Failed to add item to cart");
      });

    // Show error toast
    builder
      .addCase(fetchCartItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = action.payload;
      })
      .addCase(fetchCartItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    builder
      // Handling the removeCartItem action lifecycle
      .addCase(removeCartItem.pending, (state) => {
        state.loading = true; // Set loading state when API call starts
      })
      .addCase(removeCartItem.fulfilled, (state, action) => {
        state.loading = false; // Set loading state when API call starts
        state.cart = action.payload; // Update the cart with the new cart data
      })
      .addCase(removeCartItem.rejected, (state, action) => {
        state.status = "failed"; // Set to failed if API call fails
        state.error = action.payload; // Capture the error message
      });
  },
});

export const { removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
