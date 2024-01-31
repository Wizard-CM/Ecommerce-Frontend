//------------------------------------------------------User API Types------------------------------------------------------//
export type userType = {
  _id: string;
  username: string;
  email: string;
  gender: string;
  dob: string;
  role: string;
  photo: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  uid: string;
};
export type userTypeSample = {
  _id: string;
  username: string;
  email: string;
  gender: string;
  role: string;
  photo: string;
  uid: string;
};

export type userFetchResponse = {
  success: boolean;
  message: string;
  userData: userType;
};
export type deleteFetchResponse = Omit<userFetchResponse, "userData">;

export type deleteGarneDetails = {
  deleteUserId: string;
  id: string;
};

export interface userTypeWithPhoto extends userType {
  photo: string;
}

export type allUserFetchResponse = {
  success: boolean;
  userData: userTypeWithPhoto[];
};

// // Frontend Bata send garne Structure
export type userDataStructure = {
  username: string;
  email: string;
  photo: string;
  dob: string;
  gender: string;
  uid: string;
};

//------------------------------------------------------Product Api Types-----------------------------------------------------//

export type productType = {
  _id: string;
  name: string;
  photo: string;
  user: string;
  category: string;
  stock: number;
  price: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
  quantity?: number;
};

export type allProductResponse = {
  success: boolean;
  productData: productType[];
};

export type searchQueries = {
  search?: string;
  page?: number;
  sort?: string;
  category?: string;
  price?: number;
};

export type searchSortedProductsResponse = {
  success: boolean;
  productData: productType[];
  totalPages: number;
};

export type allCategoryResponse = {
  success: boolean;
  productData: string[];
};
export type singleProductResponse = {
  success: boolean;
  productData: productType;
};
export type updateProductResponse = {
  success: boolean;
  message: string;
};
export type ProductUpdateType = {
  data: FormData;
  productId: string;
  userId: string;
};
export type ProductDeleteDetailsType = {
  productId: string;
  userId: string;
};

type productResponse = Omit<productType, "quantity">;

export type newProductCreateResponse = {
  success: boolean;
  message: string;
  productData: productResponse;
};
export type frontendProductDetailsType = {
  id: string;
  formData: FormData;
};

//------------------------------------------------------Cart Api Types-----------------------------------------------------//
export type cartSchemaDataProps = {
  productId: string;
  userId: string;
};
export type cartFetchResponse = {
  success: boolean;
  message: string;
  cartItemData: string;
};
export type details = {
  userId?: string;
  productId: string;
};
export type cartUpdateResponse = {
  success: boolean;
  message: string;
};
//------------------------------------------------------Order Api Types-----------------------------------------------------//
export type shippingInfoProps = {
  address: string;
  city: string;
  state: string;
  country: string;
  pinCode: number;
};
export interface OrderDataType {
  user: {
    _id: string;
    username: string;
    dob: string;
  };
  shippingInfo: shippingInfoProps;
  cartItems: string[];
  status: "Processing" | "Shipped" | "Delivered";
  subTotal: number;
  tax: number;
  discount: number;
  total: number;
  shippingCharge: number;
  quantity: number;
}
export type ResponseOrderDataType = {
  shippingInfo: shippingInfoProps;
  _id: string;
  user: {
    _id: string;
    username: string;
    dob: string;
  };
  cartItems: string;
  quantity: number;
  status: string;
  subTotal: number;
  tax: number;
  discount: number;
  shippingCharge: number;
  total: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
};
export type orderDataFrontend = {
  shippingInfo: shippingInfoProps;
  cartItems: string[];
  userId: string | undefined;
  quantity: number;
  subTotal: number;
  tax: number;
  discount: number;
  shippingCharge: number;
  total: number;
};

export type newOrderResponse = {
  success: boolean;
  message: string;
  orderData: ResponseOrderDataType[];
};
export type updateDeleteOrderResponse = Omit<newOrderResponse, "orderData">;

export type myOrderResponse = Omit<newOrderResponse, "message">;

// export type cartItemProductType = {
//   _id: string,
//   product: string,
//   user: string,
//   quantity: number,
//   createdAt: string,
//   updatedAt: string,
//   __v: number,
// };
export type singleOrderResponse = {
  success: boolean;
  orderData: ResponseOrderDataType;
  cartItemData: productType[];
};

export type singleOrderDetails = {
  orderId: string;
  id: string;
};
