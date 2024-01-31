import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  myOrderResponse,
  newOrderResponse,
  orderDataFrontend,
  singleOrderDetails,
  singleOrderResponse,
  updateDeleteOrderResponse,
} from "../../Types/API-Types";

export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BACKEND_SERVER}/api/v1/order`,
  }),
  tagTypes: ["orders"],
  endpoints: (builder) => ({
    newOrders: builder.mutation<newOrderResponse, orderDataFrontend>({
      query: (order) => ({
        url: "/new",
        method: "POST",
        body: order,
      }),
      invalidatesTags: ["orders"],
    }),
    deleteOrder: builder.mutation<
      updateDeleteOrderResponse,
      singleOrderDetails
    >({
      query: (singleOrderDetails) => ({
        url: `${singleOrderDetails.orderId}?id=${singleOrderDetails.id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["orders"],
    }),
    // SOME CHANGES LEFT
    updateOrder: builder.mutation<
      updateDeleteOrderResponse,
      singleOrderDetails
    >({
      query: (singleOrderDetails) => ({
        url: `${singleOrderDetails.orderId}?id=${singleOrderDetails.id}`,
        method: "PUT",
      }),
      invalidatesTags: ["orders"],
    }),
    myOrders: builder.query<myOrderResponse, string>({
      query: (id) => `my/${id}`,
      providesTags: ["orders"],
    }),
    allOrders: builder.query<myOrderResponse, string>({
      query: (id) => `all?id=${id}`,
      providesTags: ["orders"],
    }),
    singleOrder: builder.query<singleOrderResponse, singleOrderDetails>({
      query: (singleOrderDetails) =>
        `${singleOrderDetails.orderId}?id=${singleOrderDetails.id}`,
      providesTags: ["orders"],
    }),
  }),
});

export const {
  useNewOrdersMutation,
  useDeleteOrderMutation,
  useUpdateOrderMutation,
  useMyOrdersQuery,
  useAllOrdersQuery,
  useSingleOrderQuery,
} = orderApi;
