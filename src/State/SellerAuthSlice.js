import { Cookie } from "@mui/icons-material";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const apiurl = import.meta.env.VITE_API_URL;
import Cookies from "js-cookie";

export const sellerRegister = createAsyncThunk(
  "seller/register",
  async (sellerdata, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${apiurl}/seller/signup`, sellerdata);
      console.log("seller register", response.data);
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
      // console.log("login", response.data);
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
export const sellerlogout = createAsyncThunk(
  "seller/logout",
  async (_, { rejectWithValue }) => {
    try {
      const cookies = document.cookie;

      // Find the specific cookie
      const token = cookies
        .split("; ")
        .find((row) => row.startsWith("maintoken="))
        ?.split("=")[1];

      const response = await axios.post(
        `${apiurl}/seller/logout`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Unexpected Error" }
      );
    }
  }
);
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
      .addCase(sellerRegister.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sellerRegister.fulfilled, (state, action) => {
        state.seller = action.payload.seller;
        state.error = null;
      })
      .addCase(sellerRegister.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle logout
      .addCase(sellerlogout.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.status = "logoutDone";
        state.error = null;
      })
      .addCase(sellerlogout.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;
