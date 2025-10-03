import { createSlice } from "@reduxjs/toolkit";

interface AppState {
  // Add any global app state here
}

const initialState: AppState = {
  // Initialize with default values
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    // Add reducers here
  },
});

export default appSlice.reducer;
