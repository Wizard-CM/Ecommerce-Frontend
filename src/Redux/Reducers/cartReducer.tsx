import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { productType, shippingInfoProps } from "../../Types/API-Types";
import toast from "react-hot-toast";

type initialStateProps = {
  products: productType[];
  shippingInfo: shippingInfoProps;
  quantity:number
  subTotal: number;
  tax: number;
  discount: number;
  total: number;
  shippingCharge: number;
};
type amountType = {
  subTotal: number;
  tax: number;
  quantity:number,
  discount: number;
  total: number;
  shippingCharge: number;
};

const initialState: initialStateProps = {
  products: [],
  shippingInfo: {} as shippingInfoProps,
  quantity:0,
  subTotal: 0,
  tax: 0,
  shippingCharge: 0,
  discount: 0,
  total: 0,
};

export const cartSlice = createSlice({
  name: "cartSlice",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<productType>) => {
      const productAlreadyExist = state.products.find(
        (i) => i._id == action.payload._id
      );
      if (productAlreadyExist?._id) {
        console.log("out");
      }
      // Logic for If Product Is Not Already Added to the database
      if (!productAlreadyExist) {
        state.products.push(action.payload);
        const addedToState = state.products.find(
          (i: productType) => i._id === action.payload._id
        );
        if (addedToState) {
          addedToState.quantity!++;
        }
        return;
      }
      // Logic for Product Out Of Stock
      if (productAlreadyExist.quantity! >= productAlreadyExist.stock) {
        toast.error("Product Is Out Of Stock");
        return;
      }
      productAlreadyExist.quantity! += 1;
    },
    decrementHandler: (state, action: PayloadAction<string>) => {
      const product = state.products.find(
        (i: productType) => i._id === action.payload
      );
      if (product?.quantity! <= 1) return;
      if (product) product.quantity!--;
    },
    setCartItems: (state, action: PayloadAction<productType[]>) => {
      state.products = action.payload;
    },
    removeCartItem: (state, action: PayloadAction<string>) => {
      state.products = state.products.filter(
        (i: productType) => i._id != action.payload
      );
    },
    setAmount: (state, action: PayloadAction<amountType>) => {
      state.total = action.payload.total;
      state.subTotal = action.payload.subTotal;
      state.tax = action.payload.tax;
      state.discount = action.payload.discount;
      state.shippingCharge = action.payload.shippingCharge;
      state.quantity = action.payload.quantity;
    },
    setShippingInformation: (state, action) => {
      state.shippingInfo = action.payload;
    },
    resetCart: () => initialState,
  },
});

export const {
  addToCart,
  decrementHandler,
  setCartItems,
  removeCartItem,
  setAmount,
  setShippingInformation,
  resetCart,
} = cartSlice.actions;
