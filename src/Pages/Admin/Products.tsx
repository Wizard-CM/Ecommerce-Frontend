import { ReactElement, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Column } from "react-table";
import TableHOC from "../../Components/Admin/TableHOC";
import { FaPlus } from "react-icons/fa";
import { useSelector } from "react-redux";
import rootState from "../../Redux/RootState";
import { getAllProducts } from "../../Redux/API/ProductApi";
import Loader from "../../Components/Loader";
import { productType } from "../../Types/API-Types";

type productDataType = {
  photo: ReactElement;
  name: string;
  price: number;
  stock: number;
  action: ReactElement;
};

const columns: Column<productDataType>[] = [
  {
    Header: "Photo",
    accessor: "photo",
  },
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Price",
    accessor: "price",
  },
  {
    Header: "Stock",
    accessor: "stock",
  },
  {
    Header: "Action",
    accessor: "action",
  },
];

const Products = () => {
  const { user } = useSelector((state: rootState) => state.userSlice);
  type productDataType = {
    photo: ReactElement;
    name: string;
    price: number;
    stock: number;
    action: ReactElement;
  };
  const [allProducts, SetAllProducts] = useState<productDataType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const res = getAllProducts(user?._id!);
    res.then(({ productData }) => {
      const modifiedData = productData.map((i: productType) => {
        return {
          photo: (
            <img src={`${import.meta.env.VITE_BACKEND_SERVER}/${i.photo}`} />
          ),
          name: i.name,
          price: i.price,
          stock: i.stock,
          action: <Link to={`/admin/product/${i._id}`}>Manage</Link>,
        };
      });
      SetAllProducts(modifiedData);
      setLoading(false);
    });
  }, []);

  const JSX = TableHOC(columns, allProducts, true)();
  return (
    <div className="outlet">
      {loading ? (
        <Loader />
      ) : (
        <div className="product-page">
          <h2>PRODUCTS</h2>
          {JSX}
          <Link to="/admin/product/new" className="create-product-btn">
            <FaPlus />
          </Link>
        </div>
      )}
    </div>
  );
};

export default Products;
