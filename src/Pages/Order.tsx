import { ReactElement, useEffect, useState } from "react";
import { Column } from "react-table";
import TableHOC from "../Components/Admin/TableHOC";
import { useSelector } from "react-redux";
import rootState from "../Redux/RootState";
import { useMyOrdersQuery } from "../Redux/API/OrderApi";
import Loader from "../Components/Loader";
import toast from "react-hot-toast";
import { fetchResponseError } from "../Types/General";

type orderDataType = {
  id: string;
  quantity: number;
  discount: number;
  amount: number;
  status: ReactElement;
  
};

const columns: Column<orderDataType>[] = [
  {
    Header: "Id",
    accessor: "id",
  },
  {
    Header: "Quantity",
    accessor: "quantity",
  },
  {
    Header: "Discount",
    accessor: "discount",
  },
  {
    Header: "Amount",
    accessor: "amount",
  },
  {
    Header: "Status",
    accessor: "status",
  },

];
;

const Order = () => {
  const [rows, setRows] = useState<orderDataType[]>([]);
  let tableData: orderDataType[] = [];
  const { user } = useSelector((state: rootState) => state.userSlice);
  const {
    data: orderData,
    isLoading,
    isError,
    error,
  } = useMyOrdersQuery(user?._id!);

  if (isError) {
    const err = error as fetchResponseError;
    toast.error(err.message);
  }

  useEffect(() => {
    
    if (orderData) {
      if (orderData?.orderData) {
        tableData = orderData?.orderData.map((i) => {
          return {
            id: i._id,
            amount: Math.round(i.total),
            quantity: i.quantity,
            discount: i.discount,
            status: (
              <span
                className={
                  i.status === "Processing"
                    ? "red"
                    : i.status === "Shipped"
                    ? "red"
                    : "purple"
                }
              >
                {i.status}
              </span>
            )
          };
        });
      }

      setRows(tableData);
    }
  }, [orderData]);
  
const JSX = TableHOC(columns, rows, true)()


  return (
    <div className="global-container">
      <h2>ORDERS</h2>
      <div className="order-page">{isLoading ? <Loader /> :JSX }</div>
    </div>
  );
};

export default Order;
