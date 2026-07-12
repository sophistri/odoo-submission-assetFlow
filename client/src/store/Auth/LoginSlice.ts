import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosInstance from '../../Axios/axiosInstance';
import type { LoginRequest, AuthResponseData, ApiResponse } from '../../Types/authTypes';

interface LoginState {
  loading: boolean;
  error: string | null;
  user: AuthResponseData | null;
}

const initialState: LoginState = {
  loading: false,
  error: null,
  user: JSON.parse(localStorage.getItem('user') || 'null'),
};

export const loginUser = createAsyncThunk(
  'auth/login',
  async (payload: LoginRequest, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post<ApiResponse<AuthResponseData>>('/Auth/login', payload);
      if (!res.data.success || !res.data.data) {
        return rejectWithValue(res.data.message);
      }
      return res.data.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Login failed');
    }
  }
);

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        localStorage.setItem('token', action.payload.token);
        localStorage.setItem('user', JSON.stringify(action.payload));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout } = loginSlice.actions;
export default loginSlice.reducer;