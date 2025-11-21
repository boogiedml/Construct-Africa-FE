import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { startAutoLogoutTimer } from "../../utils";

interface AuthState {
  token: string | null;
  refreshToken: string | null;
  expires: number | null;
  isAuthenticated: boolean;
}

// Initialize from localStorage on app start
const getInitialAuthState = (): AuthState => {
  const token = localStorage.getItem("access_token");
  const refreshToken = localStorage.getItem("refresh_token");
  const expires = localStorage.getItem("expires");

  return {
    token,
    refreshToken,
    expires: expires ? parseInt(expires) : null,
    isAuthenticated: !!token,
  };
};

const initialState: AuthState = getInitialAuthState();

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{
        access_token: string;
        refresh_token: string;
        expires: number;
      }>
    ) => {
      state.token = action.payload.access_token;
      state.refreshToken = action.payload.refresh_token;
      state.expires = action.payload.expires;
      state.isAuthenticated = true;

      localStorage.setItem("access_token", action.payload.access_token);
      localStorage.setItem("refresh_token", action.payload.refresh_token);
      localStorage.setItem("expires", action.payload.expires.toString());
      startAutoLogoutTimer();
    },
    logout: (state) => {
      state.token = null;
      state.refreshToken = null;
      state.expires = null;
      state.isAuthenticated = false;

      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("expires");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
