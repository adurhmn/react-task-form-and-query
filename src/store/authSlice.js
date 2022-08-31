import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  authdata: {
    sessionExists: undefined,
    authenticatedUser: null,
  },
  watchlist: [],
};

const authSlice = createSlice({
  name: "Authentication data",
  initialState,
  reducers: {
    setAuthdata(state, { payload: authdata }) {
      state.authdata = authdata;
    },
    setWatchlist(state, { payload: watchlist }) {
      state.watchlist = watchlist;
    },
  },
});

export const authSliceReducer = authSlice.reducer;
export const authSliceActions = authSlice.actions;
