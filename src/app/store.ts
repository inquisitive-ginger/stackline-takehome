import { configureStore } from "@reduxjs/toolkit";
import { productApi } from "../products/product-api.slice";

export const store = configureStore({
  reducer: {
    [productApi.reducerPath]: productApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productApi.middleware),
});
