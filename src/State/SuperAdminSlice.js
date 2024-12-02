import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
const apiurl = import.meta.env.VITE_API_URL;
import axios from "axios";
// Async Thunk for Login API Call
export const loginSuperAdmin = createAsyncThunk(
  "auth/loginUser",
  async (obj, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${apiurl}/superadmin/login`, obj, {
        withCredentials: true,
      });
      console.log(response.data, "login slice response in super admin");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

// Slice
const loginSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null, // Load token from cookies
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.superadmin = null;
      state.token = null;
      Cookies.remove("token"); // Clear token from cookies
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginSuperAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginSuperAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(loginSuperAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = loginSlice.actions;
export default loginSlice.reducer;
