
import { UserModel } from '@/app/data/model/UserModel';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  userInfo: UserModel | null;
}

const initialState: AuthState = {
  accessToken: null,
  refreshToken: null,
  userInfo: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setTokens: (
      state,
      action: PayloadAction<{ accessToken: string; refreshToken: string }>
    ) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
    setUserInfo: (state, action: PayloadAction<UserModel>) => {
      state.userInfo = action.payload;
    },
    clearAuth: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
      state.userInfo = null;
    },
  },
});

export const { setTokens, setUserInfo, clearAuth } = authSlice.actions;
export default authSlice.reducer;
