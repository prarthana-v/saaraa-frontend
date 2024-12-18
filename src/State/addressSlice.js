import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const apiurl = import.meta.env.VITE_API_URL;

// Async thunk to fetch addresses by user ID
export const getAddressByUser = createAsyncThunk(
  "address/getAddressByUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${apiurl}/address/getadresses`, {
        withCredentials: true,
      });

      console.log(response.data, "address get res");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response && error.response.data
          ? error.response.data.message
          : error.message
      );
    }
  }
);

// Async thunk to add a new address
export const addAddress = createAsyncThunk(
  "address/addAddress",
  async (address, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${apiurl}/address/add-address`,
        address,
        {
          withCredentials: true,
        }
      );

      console.log(response.data, "add address response");

      return response.data; // Assuming the response contains the added address
    } catch (error) {
      return rejectWithValue(
        error.response && error.response.data
          ? error.response.data.message
          : error.message
      );
    }
  }
);

// Async thunk to edit an existing address
export const updateAddress = createAsyncThunk(
  "address/updateAddress",
  async ({ id, updatedAddress }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${apiurl}/address/edit-address/${id}`,
        updatedAddress,
        {
          withCredentials: true,
        }
      );
      console.log(response.data, "edit address response");

      return response.data; // Assuming the response contains the updated address
    } catch (error) {
      console.log(error);

      return rejectWithValue(
        error.response && error.response.data
          ? error.response.data.message
          : error.message
      );
    }
  }
);

// Slice definition
const addressSlice = createSlice({
  name: "address",
  initialState: {
    addresses: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch addresses by user
      .addCase(getAddressByUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAddressByUser.fulfilled, (state, action) => {
        state.loading = false;
        state.addresses = action.payload;
      })
      .addCase(getAddressByUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch addresses";
      })
      // Add a new address
      .addCase(addAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addAddress.fulfilled, (state, action) => {
        state.loading = false;
        // Add the new address to the list
        if (Array.isArray(state.addresses)) {
          state.addresses.push(action.payload); // Add the new address
        } else {
          state.addresses = [action.payload]; // Ensure state.addresses is an array
        }
      })
      .addCase(addAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to add address";
      })
      // Edit an existing address
      .addCase(updateAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAddress.fulfilled, (state, action) => {
        state.loading = false;

        // Ensure state.addresses is an array
        const addressesArray = Array.isArray(state.addresses)
          ? state.addresses
          : state.addresses.addresses;

        // Update the existing address in the list
        const index = addressesArray.findIndex(
          (address) => address.id === action.payload.id
        );

        if (index !== -1) {
          addressesArray[index] = action.payload; // Replace the old address with the updated one
        }

        // Update the state properly
        state.addresses = { ...state.addresses, addresses: addressesArray };
      })
      .addCase(updateAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to edit address";
      });
  },
});

export default addressSlice.reducer;
