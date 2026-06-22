import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/authcontext";
import "../styles/addProduct.css";

const EditProduct = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    brand: "",
    stock: "",
    image: "",
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${id}`);
        const data = await res.json();

        if (res.ok) {
          setProduct(data);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const updateProduct = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`/api/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(product),
      });

      if (res.ok) {
        alert("Product Updated Successfully");
        navigate("/admin/products");
      } else {
        alert("Update Failed");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="add-product-page">
      <div className="add-product-box">
        <h1>Edit Product</h1>

        <form onSubmit={updateProduct}>
          <div className="input-group">
            <label>Name</label>
            <input name="name" value={product.name} onChange={handleChange} />
          </div>

          <div className="input-group">
            <label>Description</label>
            <textarea
              rows="5"
              name="description"
              value={product.description}
              onChange={handleChange}
            />
          </div>

          <div className="row">
            <div className="input-group">
              <label>Category</label>
              <input
                name="category"
                value={product.category}
                onChange={handleChange}
              />
            </div>

            <div className="input-group">
              <label>Brand</label>
              <input
                name="brand"
                value={product.brand}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="row">
            <div className="input-group">
              <label>Price</label>
              <input
                type="number"
                name="price"
                value={product.price}
                onChange={handleChange}
              />
            </div>

            <div className="input-group">
              <label>Stock</label>
              <input
                type="number"
                name="stock"
                value={product.stock}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="input-group">
            <label>Image URL</label>
            <input name="image" value={product.image} onChange={handleChange} />
          </div>

          <button type="submit">Update Product</button>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
