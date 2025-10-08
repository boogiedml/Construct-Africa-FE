import { configureStore } from "@reduxjs/toolkit";
import appSlice from "./features/appSlice";
import authSlice from "./features/authSlice";

import { authApi } from "./services/auth";
import { projectsApi } from "./services/projects";
import { companiesApi } from "./services/companies";
import { commonApi } from "./services/common";

const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [projectsApi.reducerPath]: projectsApi.reducer,
    [companiesApi.reducerPath]: companiesApi.reducer,
    [commonApi.reducerPath]: commonApi.reducer,

    app: appSlice,
    auth: authSlice,
  },

  // middlewares
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      projectsApi.middleware,
      companiesApi.middleware,
      commonApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
