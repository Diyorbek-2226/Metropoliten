import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../config/DataService";

// Async thunk for login
export const login = createAsyncThunk(
  "auth/login",
  async (obj, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("common/token/obtain", obj);
      return response.data;
    } catch (error) {
      // Xato xabarini olish
      const errorMessage =
        error.response?.data?.message || error.message || "Login error";
      localStorage.setItem("errorLogin", errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

export const AuthSlice = createSlice({
  name: "auth",
  initialState: {
    value: 0,
    currentUser: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
        localStorage.setItem("token", action.payload.access);
        localStorage.setItem("refresh_token", action.payload.refresh);
        localStorage.setItem("role", action.payload.role);
        localStorage.setItem("id", action.payload.id);
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default AuthSlice.reducer;
