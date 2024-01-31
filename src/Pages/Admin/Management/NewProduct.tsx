import React, { useState } from "react";
import { useSelector } from "react-redux";
import rootState from "../../../Redux/RootState";
import { useCreateProductMutation } from "../../../Redux/API/ProductApi";
import ToasterFunction from "../../../Components/Toaster";
import { useNavigate } from "react-router-dom";

const NewProduct = () => {
  const { user } = useSelector((state: rootState) => state.userSlice);
  const [createProduct] = useCreateProductMutation();
  const navigate = useNavigate();

  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [stock, setStock] = useState<number>(0);
  const [category, setCategory] = useState<string>("");
  const [file, setFile] = useState<File>();

  // Handlers
  const fileHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    // const file = e.target.files[0];
    if (e.target.files) {
      const file = e.target.files[0];
      setFile(file);
    }
  };
  const submitHanlder = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();

    formData.set("name", name);
    formData.set("category", category);
    formData.set("stock", JSON.stringify(stock));
    formData.set("price", JSON.stringify(price));
    formData.set("photo", file!);
    formData.set("user", user?._id!);

    const res = await createProduct({ formData, id: user?._id! });

    ToasterFunction(res,"Product Successfully Created");
    navigate("/admin/product")
    
    
  };
  return (
    <div className="outlet">
      <div className="new-product">
        <div className="form-container">
          <h2>New Product</h2>
          <form onSubmit={submitHanlder}>
            <label>
              <span>Name</span>
              <input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </label>
            <label>
              <span>Price</span>
              <input
                type="number"
                value={price}
                onChange={(e) => {
                  setPrice(+e.target.value);
                }}
              />
            </label>
            <label>
              <span>Stock</span>
              <input
                type="number"
                value={stock}
                onChange={(e) => {
                  setStock(+e.target.value);
                }}
              />
            </label>
            <label>
              <span>Category</span>
              <input
                type="text"
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                }}
              />
            </label>
            <label>
              <span>Photo</span>
              <input type="file" onChange={fileHandler} />
            </label>
            <button className="form-btn" type="submit">Create</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewProduct;
