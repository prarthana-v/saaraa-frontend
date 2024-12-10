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

// Async thunk to fetch users
export const fetchUsers = createAsyncThunk(
  "superadmin/fetchUsers",
  async ({ page, limit }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${apiurl}/superadmin/users?page=${page}&limit=${limit}`,
        {
          withCredentials: true,
        }
      );
      console.log(response.data);
      return response.data.data; // Extract the paginated user data from the response
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

// Async thunk to fetch users
export const fetchSellers = createAsyncThunk(
  "superadmin/fetchSellers",
  async ({ page, limit }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${apiurl}/superadmin/sellers?page=${page}&limit=${limit}`,
        {
          withCredentials: true,
        }
      );
      console.log(response.data, "sellers");
      return response.data.data; // Extract the paginated user data from the response
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

// Slice
const loginSlice = createSlice({
  name: "auth",
  initialState: {
    users: {
      allUsers: [],
      total: 0,
      page: 1,
      totalPages: 1,
    },
    sellers: {
      allSellers: [],
      total: 0,
      page: 1,
      totalPages: 1,
    },
    token: null, // Load token from cookies
    loading: false,
    error: null,
    user: {},
  },
  reducers: {
    logout: (state) => {
      state.superadmin = null;
      state.token = null;
      Cookies.remove("token"); // Clear token from cookies
    },
    clearUsers: (state) => {
      state.users = [];
    },
    clearSellers: (state) => {
      state.sellers = [];
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

    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    builder
      .addCase(fetchSellers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSellers.fulfilled, (state, action) => {
        state.loading = false;
        state.sellers = action.payload;
      })
      .addCase(fetchSellers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, clearUsers } = loginSlice.actions;
export default loginSlice.reducer;
