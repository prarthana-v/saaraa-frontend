import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const apiurl = import.meta.env.VITE_API_URL;
import Cookies from "universal-cookie";
const cookies = new Cookies();

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const token = cookies.get("token");
      console.log(token, "lll");
      if (!token) {
        console.log("no token");
        throw new Error("Authentication token not found");
      }

      const response = await axios.get(
        `${apiurl}/product/getproductsbyseller`,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`, // Include token
          },
        }
      );

      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch products"
      );
    }
  }
);

// Async thunk for creating a product
export const createProduct = createAsyncThunk(
  "products/createProduct",
  async (productData, { rejectWithValue }) => {
    try {
      console.log(productData);
      const token = Cookies.get("token");
      console.log(token, "lll");
      if (!token) {
        console.log("token nathi");
        throw new Error("Token not found. Please log in again.");
      }
      const response = await axios.post(
        `${apiurl}/product/add-product`,
        productData,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`, // Include token
          },
        }
      );
      console.log("Server response:", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error creating product");
    }
  }
);

// Async thunk for fetching all products
export const fetchAllProducts = createAsyncThunk(
  "products/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${apiurl}/product/getallproducts`);
      console.log("res", response.data);
      return response.data; // Assuming the backend sends an array of products
    } catch (error) {
      console.log(error);
      // Reject with a meaningful error message
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch products"
      );
    }
  }
);

export const fetchProductDetails = createAsyncThunk(
  "product/fetchDetails",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${apiurl}/product/getproductDetails/${id}`
      );
      console.log("product Details", response.data);
      return response.data; // Assuming the API response contains product details
    } catch (error) {
      return rejectWithValue(error.response.data || "Something went wrong");
    }
  }
);

// Initial state
const initialState = {
  products: [],
  productDetails: null,
  loading: false,
  token: null,
  error: null,
};

// Create the slice
const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    clearProductDetails: (state) => {
      state.productDetails = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch products
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
        state.seller = action.payload.seller;
        state.token = action.payload.token;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Create product
    builder
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products.push(action.payload); // Add the newly created product
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    builder
      .addCase(fetchAllProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.data; // Update state with fetched products
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Capture and store the error message
      });

    // fetch product details
    builder
      .addCase(fetchProductDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.productDetails = action.payload;
      })
      .addCase(fetchProductDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setProducts, clearProductDetails } = productSlice.actions;
export default productSlice.reducer;
