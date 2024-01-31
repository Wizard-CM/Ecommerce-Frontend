import { useState } from "react";
import ProductItem from "../Components/ProductItem";
import Loader from "../Components/Loader";
import {
  useAllCategoriesQuery,
  useSortedProductsQuery,
} from "../Redux/API/ProductApi";
import { useDispatch, useSelector } from "react-redux";
import { productType } from "../Types/API-Types";
import { addToCart } from "../Redux/Reducers/cartReducer";
import toast from "react-hot-toast";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { fetchResponseError } from "../Types/General";
import { useAddToCartBackendMutation } from "../Redux/API/CartApi";
import rootState from "../Redux/RootState";

const Search = () => {
  const [range, setRange] = useState<number>(20000);
  const [sort, setSort] = useState<string>();
  const [category, setCategory] = useState<string>();
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState<number>(0);
  const dispatch = useDispatch();
  const [addToCartBackend] = useAddToCartBackendMutation();
  const { user } = useSelector((state: rootState) => state.userSlice);
  const { products } = useSelector((state: rootState) => state.cartSlice);
  const { data, isLoading, isError, error } = useSortedProductsQuery({
    price: range,
    sort,
    category,
    search,
    page,
  });
  if (isError) {
    const err = error as fetchResponseError;
    toast.error(err.message);
  }

  // Getting and adding quantity property
  const { data: categoryData, isError: categoryError } =
    useAllCategoriesQuery(null);
  const modifiedData = data?.productData.map((i: productType) => ({
    ...i,
    quantity: 0,
  }));
  if (categoryError) {
    const err = error as fetchResponseError;
    toast.error(err.message);
  }

  // Pagination Related Data
  let arr = [];
  for (let i = 0; i < data?.totalPages!; i++) {
    arr.push(i + 1);
  }

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
    if ("data" in res) {
      toast.success(`Data Successfully Added To The Cart`);
    } else {
      const err = res.error as FetchBaseQueryError;
      const error = (err.data as fetchResponseError).message;
      toast.error(`${error}`);
    }
  };

  return (
    <div className="global-container">
      <div className="search-page">
        <div className="search-page-left">
          <h3>FILTERS</h3>
          <form>
            <label>
              <span>Sort</span>
              <select
                name=""
                id=""
                onChange={(e) => {
                  setSort(e.target.value);
                }}
              >
                <option value={"undefined"}>None</option>
                <option value="des">Price(High To Low)</option>
                <option value="asc">Price(Low To High)</option>
              </select>
            </label>
            <label>
              <span>Max Price 100000</span>
              <span style={{ marginTop: `15px` }}>Current Price {range}</span>
              <input
                type="range"
                min={100}
                max={100000}
                value={range}
                onChange={(e) => {
                  setRange(+e.target.value);
                }}
              />
            </label>
            <label>
              <span>Category</span>
              <select
                name=""
                id=""
                onChange={(e) => {
                  setCategory(e.target.value);
                }}
              >
                <option value={"undefined"}>All</option>
                {categoryData?.productData.map((cat: string, i) => {
                  return (
                    <option value={cat} key={i}>
                      {cat}
                    </option>
                  );
                })}
              </select>
            </label>
          </form>
        </div>
        <div className="search-page-right">
          <h2>PRODUCTS</h2>
          <input
            type="text"
            placeholder="Search Products...."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
          <div className="product-container">
            {isLoading ? (
              <Loader />
            ) : (
              <>
                {modifiedData?.map((product) => {
                  return (
                    <ProductItem
                      cartHandler={addToCartHanlder}
                      key={product._id}
                      name={product.name}
                      price={product.price}
                      img={product.photo}
                      product={product}
                    />
                  );
                })}
              </>
            )}
          </div>
          {data?.totalPages! > 1 && (
            <div className="button-pagination-container">
              <span>Current Page : {<strong>{page + 1}</strong>}</span>
              <span>Total Pages : {<strong>{data?.totalPages}</strong>}</span>
              <div>
                {arr.map((i, index) => {
                  if (i > 3) {
                    return;
                  }
                  return (
                    <button
                      key={index}
                      onClick={() => {
                        setPage(i - 1);
                      }}
                    >
                      {i}
                    </button>
                  );
                })}
                {data?.totalPages! > 3 && (
                  <button
                    onClick={() => {
                      if (page < data?.totalPages! - 1) {
                        setPage((prev) => prev + 1);
                      }
                    }}
                  >
                    Next Page
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
