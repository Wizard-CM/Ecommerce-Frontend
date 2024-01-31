import { FaTrash } from "react-icons/fa";
import {
  useDeleteOrderMutation,
  useSingleOrderQuery,
  useUpdateOrderMutation,
} from "../../../Redux/API/OrderApi";
import { useSelector } from "react-redux";
import rootState from "../../../Redux/RootState";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../../Components/Loader";
import ToasterFunction from "../../../Components/Toaster";

// const defaultData = {
//   shippingInfo: {
//     address: "",
//     city: "",
//     state: "",
//     country: "",
//     pinCode: "",
//   },
//   status: "",
//   subtotal: 0,
//   discount: 0,
//   shippingCharges: 0,
//   tax: 0,
//   total: 0,
//   orderItems: [],
//   user: { name: "", _id: "" },
//   _id: "",
// };

const TransactionManagement = () => {
  // const {
  //   shippingInfo: { address, city, state, country, pinCode },
  //   user: { name },
  //   status,
  //   tax,
  //   subtotal,
  //   total,
  //   discount,
  //   shippingCharges,
  // } = defaultData;
  const { user } = useSelector((state: rootState) => state.userSlice);
  const { id } = useParams();
  const { data, isLoading } = useSingleOrderQuery({
    id: user?._id!,
    orderId: id!,
  });
  const [deleteOrder] = useDeleteOrderMutation();
  const [updateOrder] = useUpdateOrderMutation();
  const navigate = useNavigate()

  // Handlers
  const deleteHandler = async () => {
    const res = await deleteOrder({ orderId: id!, id: user?._id! });
    ToasterFunction(res, "Order Successfully Deleted");
    return navigate("/admin/transaction")
  };
  const updateHandler = async () => {
    const res = await updateOrder({ orderId: id!, id: user?._id! });
    ToasterFunction(res, "Order Successfully Updated");
  };

  const shippingIngo = data?.orderData.shippingInfo;

  return (
    <div className="outlet">
      {isLoading ? (
        <Loader />
      ) : (
        <div className="transaction-management">
          <div className="transaction-management-left">
            <h2>ORDER ITEMS</h2>
            <div className="transaction-container">
              {data?.cartItemData.map((i) => {
                return (
                  <div className="transaction-item">
                    <img
                      src={`${import.meta.env.VITE_BACKEND_SERVER}/${i.photo}`}
                      alt=""
                    />
                    <p>{i.name}</p>
                    <span>Price : {i.price}</span>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="transaction-management-right">
            <article className="shipping-info-card">
              <button className="product-delete-btn" onClick={deleteHandler}>
                <FaTrash />
              </button>
              <h2>ORDER INFO</h2>
              <div>
                <h5>User Info</h5>
                <p>Country: {shippingIngo?.country.toLocaleUpperCase()}</p>
                <p>Address:{shippingIngo?.address}</p>
              </div>
              <div>
                <h5>Amount Info</h5>
                <p>Subtotal: {data?.orderData?.subTotal}</p>
                <p>Shipping Charges: {data?.orderData?.shippingCharge}</p>
                <p>Tax: {data?.orderData?.tax}</p>
                <p>Discount: {data?.orderData?.discount}</p>
                <p>Total: {data?.orderData?.total}</p>
              </div>

              <div>
                <h5>Status Info</h5>
                <p>
                  Status:
                  <span
                    className={
                      data?.orderData?.status === "Delivered"
                        ? "purple"
                        : data?.orderData?.status === "Shipped"
                        ? "green"
                        : "red"
                    }
                  >
                    {data?.orderData?.status}
                  </span>
                </p>
              </div>
              <button className="shipping-btn" onClick={updateHandler}>
                Process Status
              </button>
            </article>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionManagement;
