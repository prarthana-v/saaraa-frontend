import { Cookie } from "@mui/icons-material";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const apiurl = import.meta.env.VITE_API_URL;
import Cookies from "js-cookie";

export const login = createAsyncThunk(
  "auth/login",
  async (sellerdata, { rejectWithValue }) => {
    try {
      const token = Cookies.get("token");
      if (!token) {
        console.log("no token in login");
      }
      const response = await axios.post(`${apiurl}/seller/login`, sellerdata, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`, // Include token
        },
      });
      console.log("login", response.data);
      return response.data; // Expected to include { user, token }
    } catch (error) {
      return rejectWithValue(
        error.response && error?.response?.data?.message
          ? error.response.data.message
          : error.message
      );
    }
  }
);

// Async thunk for logout
export const logout = createAsyncThunk("auth/logout", async () => {
  // Any logout API logic can go here (if needed)
  return null;
});

const initialState = {
  seller: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setSeller: (state, action) => {
      state.seller = action.payload;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.seller = null;
      state.isAuthenticated = false;
    },
    setAuthState: (state, action) => {
      state.isAuthenticated = action.payload.isAuthenticated;
      state.seller = action.payload.seller || null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.seller = action.payload.seller;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.loading = false;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle logout
      .addCase(logout.fulfilled, (state) => {
        state.seller = null;
        state.token = null;
        state.isAuthenticated = false;
        state.loading = false;
        state.error = null;
      });
  },
});

export default authSlice.reducer;
