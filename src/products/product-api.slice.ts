import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Product } from "./types";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: (builder) => {
    return {
      fetchProductById: builder.query<Product, string>({
        query: (id) => `/products/${id}`,
      }),
    };
  },
});

export const { useFetchProductByIdQuery } = productApi;
