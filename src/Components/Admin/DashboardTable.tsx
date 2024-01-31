import { Column } from "react-table";
import TableHOC from "./TableHOC";

export interface tableData {
  _id: string;
  quantity: number;
  discount: number;
  amount: number;
  status: string;
}

const columns: Column<tableData>[] = [
  {
    Header: "Id",
    accessor: "_id",
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
// const data = JSON.transaction;

const DashboardTable = ({ data = [] }: { data: tableData[] }) => {

  return TableHOC(columns,data,false)();
};

export default DashboardTable;

