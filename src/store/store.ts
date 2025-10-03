import { configureStore } from "@reduxjs/toolkit";
import appSlice from "./features/appSlice";
import authSlice from "./features/authSlice";

import { authApi } from "./services/auth";

const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,

    app: appSlice,
    auth: authSlice,
  },

  // middlewares
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
