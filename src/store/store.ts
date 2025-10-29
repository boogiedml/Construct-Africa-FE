import { configureStore } from "@reduxjs/toolkit";
import appSlice from "./features/appSlice";
import authSlice from "./features/authSlice";

import { authApi } from "./services/auth";
import { commonApi } from "./services/common";
import { baseApi } from "./services";

const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [baseApi.reducerPath]: baseApi.reducer,
    [commonApi.reducerPath]: commonApi.reducer,

    app: appSlice,
    auth: authSlice,
  },

  // middlewares
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      baseApi.middleware,
      commonApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
