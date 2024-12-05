import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const apiurl = import.meta.env.VITE_API_URL;

export const fetchCategories = createAsyncThunk(
  "superadmin/fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${apiurl}/category/categories`);
      // console.log("categories", response.data);
      return response.data.categories;
    } catch (error) {
      return rejectWithValue(
        error.response.data || "Failed to fetch categories"
      );
    }
  }
);

export const addCategory = createAsyncThunk(
  "superadmin/addCategory",
  async (data, { rejectWithValue }) => {
    try {
      console.log(data);
      const response = await axios.post(
        `${apiurl}/category/add-category`,
        data,
        {
          withCredentials: true,
        }
      );
      console.log("categories", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response.data || "Failed to fetch categories"
      );
    }
  }
);

// Fetch category by ID
export const fetchCategoryById = createAsyncThunk(
  "category/fetchCategoryById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${apiurl}/category/getCategory/${id}`, {
        withCredentials: true,
      });
      console.log("category", response.data);
      return response.data;
    } catch (error) {
      console.log(error, "category find by id");
      return rejectWithValue(error.response.data);
    }
  }
);

// Edit category
export const editCategory = createAsyncThunk(
  "category/editCategory",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      console.log(id, formData);
      const response = await axios.put(
        `${apiurl}/category/update-category/${id}`,
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log(response.data, "edit category response");
      return response.data;
    } catch (error) {
      console.log(error, "edit category error");
      return rejectWithValue(error.response.data);
    }
  }
);

// New Async Thunk to update category order
export const updateCategoryOrder = createAsyncThunk(
  "category/updateCategoryOrder",
  async (categoryIds, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${apiurl}/category/reorder-categories`,
        {
          categoryIds,
        }
      );
      return response.data.categories; // Return the updated category list
    } catch (error) {
      return rejectWithValue(
        error.response.data || "Failed to update category order"
      );
    }
  }
);

const initialState = {
  categories: [],
  category: null,
  loading: false,
  error: null,
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    removeCategory: (state, action) => {
      state.categories = state.categories.filter(
        (category) => category._id !== action.payload
      );
    },
  },
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

    builder
      .addCase(addCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(addCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Fetch category by ID
    builder
      .addCase(fetchCategoryById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategoryById.fulfilled, (state, action) => {
        state.loading = false;
        state.category = action.payload; // Store the fetched category
      })
      .addCase(fetchCategoryById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });

    // Edit category
    builder
      .addCase(editCategory.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(editCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.category = action.payload;
      })
      .addCase(editCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });

    builder
      // Update Category Order
      .addCase(updateCategoryOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCategoryOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload; // Update the categories state with the new order
      })
      .addCase(updateCategoryOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { removeCategory } = categorySlice.actions;
export default categorySlice.reducer;
