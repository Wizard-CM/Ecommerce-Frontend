import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  ProductDeleteDetailsType,
  ProductUpdateType,
  allCategoryResponse,
  frontendProductDetailsType,
  newProductCreateResponse,
  searchQueries,
  searchSortedProductsResponse,
  singleProductResponse,
  updateProductResponse,
} from "../../Types/API-Types";
import axios from "axios";

export const ProductApi = createApi({
  reducerPath: "ProductApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BACKEND_SERVER}/api/v1/product`,
  }),
  tagTypes: ["products"],
  endpoints: (builder) => ({
    sortedProducts: builder.query<searchSortedProductsResponse, searchQueries>({
      query: (queries) =>
        `allSorted?search=${queries.search}&price=${queries.price}&sort=${queries.sort}&category=${queries.category}&page=${queries.page}`,
      providesTags: ["products"],
    }),
    allCategories: builder.query<allCategoryResponse, null>({
      query: () => `allCategory`,
      providesTags: ["products"],
    }),
    singleProduct: builder.query<singleProductResponse, string>({
      query: (id) => `${id}`,
      providesTags: ["products"],
    }),
    // Mutations
    createProduct: builder.mutation<
      newProductCreateResponse,
      frontendProductDetailsType
    >({
      query: ({ formData, id }) => ({
        url: `/new?id=${id}`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["products"],
    }),
    updateProductData: builder.mutation<
      updateProductResponse,
      ProductUpdateType
    >({
      query: ({ data, productId, userId }) => ({
        url: `/${productId}?id=${userId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["products"],
    }),

    deleteProduct: builder.mutation<
      updateProductResponse,
      ProductDeleteDetailsType
    >({
      query: ({userId,productId}) => ({
        url: `${productId}?id=${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["products"],      
    }),
  }),
});

// When we make changes / mutatation in the backend , then we need the functionality of revalidating cache,
// but if there are only get requests then there is not need of providesTags features.
// As rtk query stored the fetched data into it's cache until re-validated

export const {
  useSortedProductsQuery,
  useAllCategoriesQuery,
  useCreateProductMutation,
  useSingleProductQuery,
  useUpdateProductDataMutation,
  useDeleteProductMutation
} = ProductApi;

export const getAllProducts = async (id: string) => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_BACKEND_SERVER}/api/v1/product/all?id=${id}`
  );
  return data;
};
