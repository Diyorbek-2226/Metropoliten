import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for login
export const login = createAsyncThunk(
  'auth/login',
  async (obj, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://67.205.170.103:8001/api/v1/common/token/obtain",
        obj
      );
      localStorage.setItem("token", response.data.access);
      return response.data;
    } catch (error) {
      localStorage.setItem("errorLogin", error.message);
      return rejectWithValue(error.message);
    }
  }
);

export const AuthSlice = createSlice({
  name: 'auth',
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
        state.currentUser = action.payload.data;
        localStorage.setItem("role" , action.payload.data.role)
        localStorage.setItem("id" , action.payload.data.id);
        
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default AuthSlice.reducer;
