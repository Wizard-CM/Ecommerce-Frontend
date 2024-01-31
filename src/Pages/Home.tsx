import { Link } from "react-router-dom";
import ProductItem from "../Components/ProductItem";
import { useDispatch, useSelector } from "react-redux";
import rootState from "../Redux/RootState";
import Loader from "../Components/Loader";
import { productType } from "../Types/API-Types";
import { addToCart } from "../Redux/Reducers/cartReducer";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAddToCartBackendMutation } from "../Redux/API/CartApi";
import ToasterFunction from "../Components/Toaster";

const Home = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const [addToCartBackend] = useAddToCartBackendMutation();
  const { user } = useSelector((state: rootState) => state.userSlice);
  const { products } = useSelector((state: rootState) => state.cartSlice);

  // Handlers
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
    ToasterFunction(res,"Cart Item Successfully Added");
  };

  // Get the Products
  useEffect(() => {
    const res = axios.get(
      `${import.meta.env.VITE_BACKEND_SERVER}/api/v1/product/all?id=65b8fb1c9e0b09e6ef235e45`
    );
    res.then(({ data }) => {
      const modifiedData = data.productData.map((i: productType) => ({
        ...i,
        quantity: 0,
      }));
      setAllProducts(modifiedData);
      setLoading(false);
    });
  }, []);

  // console.log(products);

  return (
    <div className="global-container">
      <div className="home-page">
        <section></section>
        <div className="product-display">
          <div className="product-display-title">
            <h2>LATEST PRODUCTS</h2>
            <Link to="/search">SHOW MORE</Link>
          </div>
          <div className="latest-products-container">
            {/* Latest Product will be Mapped */}
            {loading ? (
              <Loader />
            ) : (
              <>
                {loading ? (
                  <Loader />
                ) : (
                  <>
                    {allProducts.map((product: productType, i) => {
                      if (i > 2) {
                        return;
                      }
                      return (
                        <ProductItem
                          cartHandler={addToCartHanlder}
                          name={product.name}
                          price={product.price}
                          img={product.photo}
                          key={product._id}
                          product={product}
                        />
                      );
                    })}
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
