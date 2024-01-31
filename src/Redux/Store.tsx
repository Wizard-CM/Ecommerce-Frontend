import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "./API/UserApi";
import { userSlice } from "./Reducers/userReducer";
import { ProductApi } from "./API/ProductApi";
import { cartSlice } from "./Reducers/cartReducer";
import { cartApi } from "./API/CartApi";
import { chartApi } from "./API/ChartApi";
import { orderApi } from "./API/OrderApi";

export const store = configureStore({
  reducer: {
    // Api
    [userApi.reducerPath]: userApi.reducer,
    [ProductApi.reducerPath]: ProductApi.reducer,
    [cartApi.reducerPath]: cartApi.reducer,
    [chartApi.reducerPath]: chartApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,

    // Reducers
    [userSlice.name]: userSlice.reducer,
    [cartSlice.name]: cartSlice.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      userApi.middleware,
      ProductApi.middleware,
      cartApi.middleware,
      chartApi.middleware,
      orderApi.middleware
    ),
});
