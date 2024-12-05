import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const apiurl = import.meta.env.VITE_API_URL;

// Async thunk to add a subcategory
export const addSubcategory = createAsyncThunk(
  "subcategories/addSubcategory",
  async (subcategoryData, { rejectWithValue }) => {
    try {
      console.log(subcategoryData, "scd");
      const response = await axios.post(
        `${apiurl}/subcategory/add-subcategory`,
        subcategoryData,
        {
          withCredentials: true,
        }
      );
      console.log(response.data, "subcategory add response");
      return response.data;
    } catch (error) {
      console.log(error, "subcategory add error");
      return rejectWithValue(
        error.response.data || "Failed to add subcategory"
      );
    }
  }
);

// Async thunk to fetch subcategories
export const fetchSubcategories = createAsyncThunk(
  "subcategories/fetchSubcategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${apiurl}/subcategory/getsubcategories`
      );
      console.log(response.data, "subcategory fetch response");
      return response.data;
    } catch (error) {
      console.log(error, "subcategory fetch error");
      return rejectWithValue(
        error.response?.data || "Failed to fetch subcategories"
      );
    }
  }
);

// Async thunk for editing a subcategory
export const editSubcategory = createAsyncThunk(
  "subcategory/editSubcategory",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${apiurl}/subcategory/update-subcategory/${id}`,
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log(response.data, "subcategory edit response");
      return response.data; // Return the updated subcategory
    } catch (error) {
      console.log(error, "subcategory edit error");
      return rejectWithValue(
        error.response?.data?.message || "Something went wrong"
      );
    }
  }
);

// Thunk to handle deleting a subcategory
export const deleteSubcategory = createAsyncThunk(
  "subcategories/deleteSubcategory",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${apiurl}/subcategory/delete-subcategory/${id}`,
        {
          withCredentials: true,
        }
      );
      console.log(response.data, "subcategory delete response");
      return response.data;
    } catch (error) {
      console.log(error, "subcategory delete error");
      return rejectWithValue(error.response.data);
    }
  }
);

export const reorderSubcategories = createAsyncThunk(
  "superadmin/reorderSubcategories",
  async (subcategoryIds, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${apiurl}/subcategory/reorder-subcategories`,
        { subcategoryIds },
        { withCredentials: true }
      );
      return response.data.subcategories;
    } catch (error) {
      return rejectWithValue(
        error.response.data || "Failed to reorder subcategories"
      );
    }
  }
);

const subcategorySlice = createSlice({
  name: "subcategories",
  initialState: {
    subcategories: [],
    subcategory: {},
    loading: false,
    error: null,
  },
  reducers: {
    removeSubcategory: (state, action) => {
      state.subcategories = state.subcategories.filter(
        (subcategory) => subcategory.id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addSubcategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addSubcategory.fulfilled, (state, action) => {
        state.loading = false;
        state.subcategories.push(action.payload); // Assuming the API returns the added subcategory
      })
      .addCase(addSubcategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to add subcategory";
      });

    builder
      .addCase(fetchSubcategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSubcategories.fulfilled, (state, action) => {
        state.loading = false;
        state.subcategories = action.payload;
      })
      .addCase(fetchSubcategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch subcategories";
      });

    builder
      // Edit Subcategory
      .addCase(editSubcategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editSubcategory.fulfilled, (state, action) => {
        state.loading = false;
        const updatedSubcategory = action.payload;
        // Update the subcategory in the state
        state.subcategories = state.subcategories.map((subcategory) =>
          subcategory._id === updatedSubcategory._id
            ? updatedSubcategory
            : subcategory
        );
      })
      .addCase(editSubcategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(deleteSubcategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteSubcategory.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload.message;
        // Remove the deleted subcategory from the state
        state.subcategories = state.subcategories.filter(
          (subcategory) => subcategory._id !== action.payload.subcategory._id
        );
      })
      .addCase(deleteSubcategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message || "Failed to delete subcategory";
      });

    builder
      .addCase(reorderSubcategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(reorderSubcategories.fulfilled, (state, action) => {
        state.loading = false;
        state.subcategories = action.payload;
      })
      .addCase(reorderSubcategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { removeSubcategory } = subcategorySlice.actions;
export default subcategorySlice.reducer;
