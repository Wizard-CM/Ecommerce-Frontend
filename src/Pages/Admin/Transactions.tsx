import  { ReactElement, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Column } from "react-table";
import TableHOC from "../../Components/Admin/TableHOC";
import { useSelector } from "react-redux";
import rootState from "../../Redux/RootState";
import { useAllOrdersQuery } from "../../Redux/API/OrderApi";
import Loader from "../../Components/Loader";

type transactionDataType = {
  avatar: string;
  amount: number;
  discount: number;
  quantity: number;
  status: ReactElement;
  action: ReactElement;
};

const columns: Column<transactionDataType>[] = [
  {
    Header: "Avatar",
    accessor: "avatar",
  },
  {
    Header: "Amount",
    accessor: "amount",
  },
  {
    Header: "Discount",
    accessor: "discount",
  },
  {
    Header: "Quantity",
    accessor: "quantity",
  },
  {
    Header: "Status",
    accessor: "status",
  },
  {
    Header: "Action",
    accessor: "action",
  },
];

const Transactions = () => {
  const [rows, setRows] = useState<transactionDataType[]>([]);
  const { user } = useSelector((state: rootState) => state.userSlice);
  let tableData: transactionDataType[] = [];
  const {
    data: transactionData,
    isLoading,
  } = useAllOrdersQuery(user?._id!);



  useEffect(() => {
    if (transactionData) {
      console.log(transactionData.orderData)
      if (transactionData?.orderData) {
        tableData = transactionData?.orderData.map((i) => {
          return {
            avatar: i.user?.username,
            amount: i?.total,
            quantity: i?.quantity,
            discount: i?.discount,
            status: (
              <span
                className={
                  i.status === "Processing"? "red": i.status === "Shipped"
                    ? "green"
                    : "purple"
                }
              >
                {i.status}
              </span>
            ),
            action: <Link to={`/admin/transaction/${i._id}`}>Manage</Link>,
          };
        });
      }

      setRows(tableData);
    }
  }, [transactionData]);

  const JSX = TableHOC(columns, rows, true)();

  return (
    <>
      <div className="outlet">
        <div className="transaction-section">
          <h2>TRANSACTIONS</h2>
          <main>{isLoading ? <Loader /> : JSX}</main>
        </div>
      </div>
    </>
  );
};

export default Transactions;
