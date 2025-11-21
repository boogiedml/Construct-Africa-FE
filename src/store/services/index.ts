import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState, AppDispatch } from "../store";
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query";

// Custom baseQuery that handles TOKEN_EXPIRED errors
export const baseQueryWithReauth = (
  baseQuery: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError>
): BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> => {
  return async (args, api, extraOptions) => {
    const result = await baseQuery(args, api, extraOptions);

    // Check if the error contains TOKEN_EXPIRED code
    if (result.error) {
      const errorData = result.error.data as any;
      
      // Check for TOKEN_EXPIRED in various possible error structures
      const isTokenExpired = 
        errorData?.code === 'TOKEN_EXPIRED' ||
        errorData?.errors?.some((err: any) => err.code === 'TOKEN_EXPIRED') ||
        (typeof errorData === 'string' && errorData.includes('TOKEN_EXPIRED'));

      if (isTokenExpired) {
        // Get the store dispatch
        const dispatch = api.dispatch as AppDispatch;
        
        // Import logout action dynamically to avoid circular dependency
        const { logout } = await import("../features/authSlice");
        
        // Dispatch logout
        dispatch(logout());
        
        // Redirect to login
        window.location.href = '/login';
      }
    }

    return result;
  };
};

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth(
    fetchBaseQuery({
      baseUrl: import.meta.env.VITE_API_URL,
      prepareHeaders: (headers, { getState }) => {
        const state = getState() as RootState;
        const token = state.auth.token;

        if (token) {
          headers.set("Authorization", `Bearer ${token}`);
        }

        headers.set("Accept", "application/json");
        headers.set("Content-Type", "application/json");
        headers.set("User-Agent", "MyApp/1.0");

        return headers;
      },
    })
  ),
  keepUnusedDataFor: 0,
  refetchOnMountOrArgChange: true,
  endpoints: () => ({}),
});

export const noAuthApi = createApi({
  reducerPath: "noAuthApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    prepareHeaders: (headers) => {
      headers.set("Accept", "application/json");
      headers.set("Content-Type", "application/json");
      headers.set("User-Agent", "MyApp/1.0");
      return headers;
    },
  }),
  keepUnusedDataFor: 0,
  refetchOnMountOrArgChange: true,
  endpoints: () => ({}),
});