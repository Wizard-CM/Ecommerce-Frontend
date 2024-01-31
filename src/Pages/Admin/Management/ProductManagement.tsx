import React, { useEffect, useState } from "react";
import {
  useDeleteProductMutation,
  useSingleProductQuery,
  useUpdateProductDataMutation,
} from "../../../Redux/API/ProductApi";
import { useSelector } from "react-redux";
import rootState from "../../../Redux/RootState";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../../Components/Loader";
import ToasterFunction from "../../../Components/Toaster";
import { FaTrash } from "react-icons/fa";

const initialData = {
  name: "",
  price: 0,
  stock: 0,
  category: "",
  photo: "",
};

const ProductManagement = () => {
  const { user } = useSelector((state: rootState) => state.userSlice);
  const { id } = useParams();
  const { data, isLoading } = useSingleProductQuery(id!); // rememeber this is a hook
  const [updateProductData] = useUpdateProductDataMutation();
  const [deleteProductData] = useDeleteProductMutation();
  const navigate = useNavigate();

  // Update States
  const { name, price, category, stock, photo } =
    data?.productData || initialData;
  const [updateName, setUpdateName] = useState<string>(name);
  const [updatePrice, setUpdatePrice] = useState<number>(price);
  const [updateStock, setUpdateStock] = useState<number>(stock);
  const [updateCategory, setUpdateCategory] = useState<string>(category);
  const [photoo, setPhotoo] = useState<File>();
  const [photoFile, setPhotoFiles] = useState<string | null>(null);

  // Handlers
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      if (file) {
        setPhotoo(file);
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = () => {
          setPhotoFiles(reader.result as string);
        };
      }
    }
  };
  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set("name", updateName);
    formData.set("category", updateCategory);
    formData.set("stock", JSON.stringify(updateStock));
    formData.set("price", JSON.stringify(updatePrice));
    formData.set("photo", photoo!);
    const res = await updateProductData({
      data: formData,
      productId: id!,
      userId: user?._id!,
    });

    ToasterFunction(res, "Product Successfully Updated");
    navigate("/admin/product");
  };
  const deleteHandler = async () => {
    const res = await deleteProductData({ userId: user?._id!, productId: id! });
    ToasterFunction(res,"Product Successfully Deleted");
    navigate("/admin/product")
  };

  useEffect(() => {
    setUpdateName(data?.productData.name!);
    setUpdatePrice(data?.productData.price!);
    setUpdateCategory(data?.productData.category!);
    setUpdateStock(data?.productData.stock!);
  }, [data]);

  return (
    <div className="outlet">
      {isLoading ? (
        <Loader />
      ) : (
        <div className="product-management">
          <div className="product-management-left">
            <span className="stock">
              {stock >= 1 ? (
                `${stock} In Stock`
              ) : (
                <span style={{ color: "red" }}>Product Out of Stock</span>
              )}
            </span>
            <p>ID-298nfksnnr9n3</p>
            <div className="image">
              <img
                src={
                  photoFile || `${import.meta.env.VITE_BACKEND_SERVER}/${photo}`
                }
                alt=""
              />
            </div>
            <div className="description">
              <span>{name}</span>
              <h3>₹{price}</h3>
            </div>
          </div>
          <div className="product-management-right">
            <button className="product-delete-btn" onClick={deleteHandler}>
              <FaTrash />
            </button>
            <h2>MANAGE</h2>
            <form onSubmit={submitHandler}>
              <label>
                <span>Name</span>
                <input
                  type="text"
                  value={updateName}
                  onChange={(e) => {
                    setUpdateName(e.target.value);
                  }}
                />
              </label>
              <label>
                <span>Price</span>
                <input
                  type="number"
                  value={updatePrice}
                  onChange={(e) => {
                    setUpdatePrice(+e.target.value);
                  }}
                />
              </label>
              <label>
                <span>Stock</span>
                <input
                  type="number"
                  value={updateStock}
                  onChange={(e) => {
                    setUpdateStock(+e.target.value);
                  }}
                />
              </label>
              <label>
                <span>Category</span>
                <input
                  type="text"
                  value={updateCategory}
                  onChange={(e) => {
                    setUpdateCategory(e.target.value);
                  }}
                />
              </label>
              <label>
                <input type="file" onChange={handleFileChange} />
              </label>
              <button type="submit">Update</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductManagement;
