// src/redux/cartSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const apiurl = import.meta.env.VITE_API_URL;

const normalizeCartData = (cart) => ({
  items: cart?.cartitems?.map((item) => ({
    id: item._id,
    productId: item.productId,
    productName: item.productName,
    price: parseFloat(item.price),
    quantity: item.quantity,
    totalPrice: item.totalPrice,
    discount: item.discount,
  })),
  totalAmount: cart.cartTotalAmt,
  totalQuantity: cart.cartTotalItems,
});

// Async thunk for adding to cart
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (item, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${apiurl}/cart/add-item`, item, {
        withCredentials: true,
      });

      return response.data;
    } catch (error) {
      console.error("Add to cart error:", error);
      // Extracting and returning a simple error message
      console.log(error, "ddd");
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
      // console.log("Full API Response", response.data);
      if (response.data.success) {
        console.log("Cart fetch response", response.data.data.cart);
        return response.data.data.cart; // Return the raw cart data
      } else {
        return rejectWithValue("Failed to fetch cart items");
      }
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

// Async thunk for clearing the cart
export const clearCart = createAsyncThunk(
  "cart/clearCart",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${apiurl}/cart/clearcart`, {
        withCredentials: true,
      }); // Replace with your actual API endpoint
      return response.data.cart; // Return the cleared cart object
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [], // Array of items in the cart
    totalAmount: 0, // Total price
    totalQuantity: 0, // Total number of items
    loading: false, // Loading state
    error: null, // Error state
  },
  reducers: {
    removeFromCart: (state, action) => {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      if (existingItem) {
        state.totalQuantity -= existingItem.quantity;
        state.totalPrice -= existingItem.totalPrice;
        state.items = state.items.filter((item) => item.id !== id);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        console.log(action.payload, "ap");
        const normalizedCart = normalizeCartData(action.payload.cart);
        console.log(normalizedCart, "nc");
        state.items = normalizedCart.items;
        state.totalAmount = normalizedCart.totalAmount;
        state.totalQuantity = normalizedCart.totalQuantity;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Show error toast
    builder
      .addCase(fetchCartItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.loading = false;
        const normalizedCart = normalizeCartData(action.payload);
        state.items = normalizedCart.items;
        state.totalAmount = normalizedCart.totalAmount;
        state.totalQuantity = normalizedCart.totalQuantity;
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

    builder
      .addCase(clearCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(clearCart.fulfilled, (state) => {
        state.items = [];
        state.totalAmount = 0;
        state.totalQuantity = 0;
        state.loading = false;
      })
      .addCase(clearCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
