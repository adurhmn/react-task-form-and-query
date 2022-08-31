import { querySliceReducer } from "./querySlice";
import { configureStore } from "@reduxjs/toolkit";
import { authSliceReducer } from "./authSlice";

const store = configureStore({
  reducer: {
    query: querySliceReducer,
    auth: authSliceReducer,
  },
});

export default store;
