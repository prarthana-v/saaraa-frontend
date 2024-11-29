import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const apiurl = import.meta.env.VITE_API_URL;
import Cookies from "js-cookie";

// Async thunk for user registration
export const registerUser = createAsyncThunk(
  "auth/register",
  async (userdata, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${apiurl}/auth/register`, userdata);
      console.log("register user response : ", response.data);
      return response.data;
    } catch (error) {
      console.log(error);

      // Handle error response
      return rejectWithValue(
        error.response && error.response.data
          ? error.response.data.message
          : "Registration failed"
      );
    }
  }
);

// Async thunk for user login
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (loginData, { rejectWithValue }) => {
    try {
      const token = Cookies.get("token");
      if (!token) {
        console.log("no token in login user");
      }
      console.log(token);
      const response = await axios.post(`${apiurl}/auth/login`, loginData, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`, // Include token
        },
      });
      console.log("login user response : ", response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(
        error.response && error.response.data
          ? error.response.data.message
          : "Login failed"
      );
    }
  }
);

export const getUserRecord = createAsyncThunk(
  "auth/getUser",
  async (_, { rejectWithValue }) => {
    try {
      const token = Cookies.get("token");
      if (!token) {
        console.log("no token in get user");
      }
      console.log(token);
      const response = await axios.get(`${apiurl}/auth/getuser`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`, // Include token
        },
      });
      console.log("get user response : ", response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(
        error.response && error.response.data
          ? error.response.data.message
          : "Login failed"
      );
    }
  }
);

export const logout = createAsyncThunk(
  "seller/logout",
  async (_, { rejectWithValue }) => {
    try {
      const token = Cookies.get("sellertoken");

      const response = await axios.post(
        `${apiurl}/auth/logout`,
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

const authSlice = createSlice({
  name: "userauth",
  initialState: {
    user: null,
    token: null,
    isAuthenticated: false,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.loading = false;
      state.error = null;
    },
    resetAuthState: (state) => {
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Register User
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Login User
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getUserRecord.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserRecord.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(getUserRecord.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Handle logout
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.error = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { resetAuthState } = authSlice.actions;

export default authSlice.reducer;
