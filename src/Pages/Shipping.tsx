import React, { useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import rootState from "../Redux/RootState";
import axios from "axios";
import { setShippingInformation } from "../Redux/Reducers/cartReducer";
import { shippingInfoProps } from "../Types/General";

const shipping_Info = {
  address: "Samakhusi",
  city: "Kathmandu",
  state: "Kathmandu",
  country: "Nepal",
  pinCode: 20834,
};

const Shipping = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [shippingInfo, setShippingInfo] = useState<shippingInfoProps>(shipping_Info);
  const { products,total } = useSelector((state: rootState) => state.cartSlice);

  // Hanlders
  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(setShippingInformation(shippingInfo))
    
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_SERVER}/api/v1/payment/create`,
        {
          amount: total,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      navigate("/pay", {
        state: data.stripe_Secret,
      });
    } catch (error) {}
  };
  const changeHandler = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
  };

  if (products.length <= 0) {
    return <Navigate to={"/cart"} />;
  }
  return (
    <div className="global-container">
      <div className="shipping-page">
        <button
          className="back-btn"
          onClick={() => {
            navigate("/cart");
          }}
        >
          <BiArrowBack />
        </button>

        <form onSubmit={submitHandler}>
          <h2>SHIPPING ADDRESS</h2>

          <input
            required
            type="
          constext"
            placeholder="Address"
            name="address"
            onChange={changeHandler}
          />

          <input
            required
            type="text"
            placeholder="City"
            name="city"
      
            onChange={changeHandler}
          />

          <input
            required
            type="text"
            placeholder="State"
            name="state"

            onChange={changeHandler}
          />

          <select
            name="country"
            required
            onChange={changeHandler}
          >
            <option value="">Choose Country</option>
            <option value="india">Nepal</option>
            <option value="india">India</option>
            <option value="india">China</option>
            <option value="india">Japan</option>
          </select>

          <input
            required
            type="number"
            placeholder="Pin Code"
            name="pinCode"
            onChange={changeHandler}
          />

          <button type="submit">Pay Now</button>
        </form>
      </div>
    </div>
  );
};

export default Shipping;
