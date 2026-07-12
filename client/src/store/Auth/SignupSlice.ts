import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosInstance from '../../Axios/axiosInstance';
import type { SignupRequest, ApiResponse } from '../../Types/authTypes';

interface SignupState {
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: SignupState = {
  loading: false,
  error: null,
  success: false,
};

export const signupUser = createAsyncThunk(
  'auth/signup',
  async (payload: SignupRequest, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post<ApiResponse<string>>('/Auth/signup', payload);
      if (!res.data.success) {
        return rejectWithValue(res.data.message);
      }
      return res.data.message;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Signup failed');
    }
  }
);

const signupSlice = createSlice({
  name: 'signup',
  initialState,
  reducers: {
    resetSignupState: (state) => {
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetSignupState } = signupSlice.actions;
export default signupSlice.reducer;