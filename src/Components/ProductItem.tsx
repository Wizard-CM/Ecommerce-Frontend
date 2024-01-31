import { FaPlus } from "react-icons/fa";
import { productType } from "../Types/API-Types";

interface productProps {
  img: string;
  name: string;
  price: number;
  cartHandler: (product: productType) => void,
  product:productType
}

const ProductItem = ({ img, price, name,cartHandler,product }: productProps) => {
  return (
    <div className="latest-product">
      <div>
        <img src={`${import.meta.env.VITE_BACKEND_SERVER}/${img}`} alt="" />
      </div>
      <span>{name}</span>
      <h3>₹{price}</h3>
      <div className="overlay">
        <button onClick={()=>{cartHandler(product)}}>
          {" "}
          <FaPlus />
        </button>
      </div>
    </div>
  );
};

export default ProductItem;
