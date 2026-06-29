import React, { useContext, useState } from "react";
import { AuthContext } from "../context/authcontext";
import { useNavigate } from "react-router-dom";
import "../styles/addProduct.css";

const AddProduct = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    brand: "",
    price: "",
    stock: "",
  });

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  if (!user || user.role !== "admin") {
    navigate("/");
    return null;
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      return alert("Please select an image");
    }

    setLoading(true);

    const data = new FormData();

    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("category", formData.category);
    data.append("brand", formData.brand);
    data.append("price", formData.price);
    data.append("stock", formData.stock);
    data.append("image", image);

    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/products`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
        body: data,
      });

      const responseData = await res.json();

      if (res.ok) {
        alert("Product Added Successfully");
        navigate("/admin/products");
      } else {
        alert(responseData.message || "Unable to add product");
      }
    } catch (err) {
      console.log(err);
      alert("Server Error");
    }

    setLoading(false);
  };

  return (
    <div className="add-product-page">
      <div className="add-product-box">
        <h1>Add New Product</h1>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Product Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="5"
              required
            />
          </div>

          <div className="row">
            <div className="input-group">
              <label>Category</label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label>Brand</label>
              <input
                type="text"
                name="brand"
                value={formData.brand}
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
                value={formData.price}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label>Stock</label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="input-group">
            <label>Product Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              required
            />
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Adding Product..." : "Add Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
