import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import rootState from "../Redux/RootState";
import { useNewOrdersMutation } from "../Redux/API/OrderApi";
import { productType } from "../Types/API-Types";
import { resetCart } from "../Redux/Reducers/cartReducer";
import { useDeleteAllCartOfUserMutation } from "../Redux/API/CartApi";
import ToasterFunction from "../Components/Toaster";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PROMISE);


const Checkout = () => {
  const location = useLocation();
  const clientSecret: string | undefined = location.state;
  const dispatch = useDispatch();
  console.log(clientSecret)

  if (!clientSecret) return <Navigate to="/shipping" />;

  const CheckoutForm = () => {
    const [processing, setProcessing] = useState(false);
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();
    const [newOrder] = useNewOrdersMutation();
    const { user } = useSelector((state: rootState) => state.userSlice);
    const [deleteUserCartItems] = useDeleteAllCartOfUserMutation()
    const {
      products,
      shippingInfo,
      shippingCharge,
      tax,
      total,
      subTotal,
      discount,
      quantity,
    } = useSelector((state: rootState) => state.cartSlice);

    // Handler
    const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (!stripe || !elements) return;
      setProcessing(true);
      const orderData = {
        shippingInfo,
        shippingCharge,
        tax,
        total,
        subTotal,
        discount,
        quantity,
        cartItems: products.map((i: productType) => i._id),
        userId: user?._id,
      };
      await newOrder(orderData);

      const { paymentIntent, error } = await stripe.confirmPayment({
        elements,
        confirmParams: { return_url: window.location.origin },
        redirect: "if_required",
      });

      if (error) {
        setProcessing(false);
        return toast.error(error.message || "Something Went Wrong");
      }

      if (paymentIntent.status === "succeeded") {
        toast.success("Payment Made Successfully")
        const res = await deleteUserCartItems(user?._id!);
        ToasterFunction(res,"All CartItems Are Cleared")
        dispatch(resetCart());
        navigate("/order");
      }
      setProcessing(false);
    };

    return (
      <div className="checkout-form-container">
        <form onSubmit={submitHandler}>
          <PaymentElement />
          <button type="submit" disabled={processing}>
            {processing ? "Processing...." : "Pay"}
          </button>
        </form>
      </div>
    );
  };

  return (
    <>
      <Elements
        options={{
          clientSecret,
        }}
        stripe={stripePromise}
      >
        <CheckoutForm />
      </Elements>
    </>
  );
};

export default Checkout;
