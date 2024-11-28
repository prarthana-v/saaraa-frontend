// src/redux/cartSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const apiurl = import.meta.env.VITE_API_URL;
import { toast } from "react-toastify";

// Async thunk for adding to cart
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (item, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${apiurl}/cart/add-item`, item); // Send item in request
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
        toast.success("Item added to cart successfully!");
        // Show success toast
      })
      // Rejected state
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
        // toast.error(action.payload || "Failed to add item to cart");
      });

    // Show error toast
  },
});

export const { removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
