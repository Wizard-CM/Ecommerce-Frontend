import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import rootState from "../Redux/RootState";
import {
  addToCart,
  decrementHandler,
  removeCartItem,
  setCartItems,
  setAmount,
} from "../Redux/Reducers/cartReducer";
import { useEffect } from "react";
import axios from "axios";
import {
  updateCartItem,
  useAddToCartBackendMutation,
  useDeleteFromCartMutation,
} from "../Redux/API/CartApi";
import { productType } from "../Types/API-Types";
import { FaTrash } from "react-icons/fa";
import ToasterFunction from "../Components/Toaster";

const Cart = () => {
  const dispatch = useDispatch();
  const [addToCartBackend] = useAddToCartBackendMutation();
  const [deleteFromCartBackend] = useDeleteFromCartMutation();
  const { user } = useSelector((state: rootState) => state.userSlice);
  const { products } = useSelector((state: rootState) => state.cartSlice);

  // Handlers

  // Decrement Handler
  const decrementHandlerFunction = async (id: string) => {
    dispatch(decrementHandler(id));
    const product = products.find((i: productType) => i._id === id);

    if (product?.quantity! <= 1) {
      return;
    }

    // Changes should be reflected to the database as well
    const res = await updateCartItem({ userId: user?._id, productId: id });
    ToasterFunction(res,"Cart Successfully Updated")
  };

  // Increment Handler
  const addToCartHanlder = async (product: productType) => {
    dispatch(addToCart(product));

    const cartAddedProduct = products.find(
      (i: productType) => i._id === product._id
    );

    if (cartAddedProduct?.quantity! >= cartAddedProduct?.stock!) {
      return;
    }

    const res = await addToCartBackend({
      productId: product._id,
      userId: user?._id!,
    });
    ToasterFunction(res, "Cart Item Successfully Incremented");
  };

  // Remove Handler
  const cartItemRemoveHandler = async (id: string) => {
    dispatch(removeCartItem(id));
    const res = await deleteFromCartBackend({
      userId: user?._id,
      productId: id,
    });
    ToasterFunction(res, "Cart Item Successfully Removed");
  };

  useEffect(() => {
    const res = axios.get(
      `${import.meta.env.VITE_BACKEND_SERVER}/api/v1/cart/${user?._id}`
    );
    res.then(({ data }) => {
      const cartItemsData = data.cartItemData.map((i: any) => {
        return { ...i.product, quantity: i.quantity };
      });
      dispatch(setCartItems(cartItemsData));
    });
  }, []);

  // Cart Items Pricing Details
  const subTotal = products?.reduce((acc, curr) => {
    return (acc += curr.quantity! * curr.price);
  }, 0);
  const shippingCharge = subTotal < 10000 ? 0 : 100;
  const tax = Math.round((subTotal + shippingCharge) * 0.13);
  const discount = 0;
  const total = subTotal + shippingCharge + tax - discount;
  const orderQuantity = products.reduce(
    (acc, curr) => (acc += curr.quantity!),
    0
  );
  console.log(orderQuantity)

  useEffect(() => {
    if (total) {
      dispatch(setAmount({total,subTotal,shippingCharge,tax,discount,quantity:orderQuantity}));
    }
  }, [total,subTotal,orderQuantity]);

  return (
    <div className="global-container">
      <div className="cart-page">
        <div className="cart-page-container">
        <div className="cart-page-left">
          {products.length < 1 ? (
            <h2>No Items Added</h2>
          ) : (
            <>
              {products.map((i) => {
                return (
                  <div className="cart-item">
                    <div className="cart-item-left">
                      <img
                        src={`${import.meta.env.VITE_BACKEND_SERVER}/${
                          i.photo
                        }`}
                        alt=""
                      />
                      <div className="cart-item-info">
                        <h4>{i?.name?.toLocaleUpperCase()}</h4>
                        <span>{i?.price}</span>
                      </div>
                    </div>
                    <div className="cart-item-right">
                      <button
                        className="operators"
                        onClick={() => {
                          addToCartHanlder(i);
                        }}
                      >
                        +
                      </button>
                      <span className="quantity">{i?.quantity}</span>
                      <button
                        className="operators"
                        onClick={() => {
                          decrementHandlerFunction(i?._id);
                        }}
                      >
                        -
                      </button>
                      <button
                        className="delete"
                        onClick={() => {
                          cartItemRemoveHandler(i?._id);
                        }}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                );
              })}
            </>
          )}
        </div>
        <div className="cart-page-right">
          <p>Subtotal:{<span>₹{subTotal}</span>}</p>
          <p>ShippingCharges:{<span>₹{shippingCharge}</span>}</p>
          <p>Tax:{<span>₹{tax}</span>}</p>
          <p>Discont:₹{<span style={{ color: "red" }}>{discount}</span>}</p>
          <h3>Total:{<span>₹{total}</span>}</h3>
          <input type="text" placeholder="Coupon Code" />

          {products.length >= 1 && (
            <button>
              <Link to="/shipping">Check Out</Link>
            </button>
          )}
        </div>

        </div>
      </div>
    </div>
  );
};

export default Cart;
