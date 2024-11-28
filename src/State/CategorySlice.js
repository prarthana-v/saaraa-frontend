import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const apiurl = import.meta.env.VITE_API_URL;

export const fetchCategories = createAsyncThunk(
  "sellerProduct/fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${apiurl}/category/categories`);
      console.log("categories", response.data);
      return response.data.categories;
    } catch (error) {
      return rejectWithValue(
        error.response.data || "Failed to fetch categories"
      );
    }
  }
);

const initialState = {
  categories: [],
  loading: false,
  error: null,
};

const sellerProductSlice = createSlice({
  name: "sellerProduct",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default sellerProductSlice.reducer;
