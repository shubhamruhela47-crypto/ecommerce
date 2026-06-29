import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authcontext";
import "../styles/manageProducts.css";

const ManageProducts = () => {
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/products`);
        const data = await res.json();

        setProducts(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error(error);
      }

      setLoading(false);
    };

    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) {
      return;
    }

    try {
    const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/products/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      if (res.ok) {
        setProducts(products.filter((item) => item._id !== id));
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <h2 className="loading">Loading...</h2>;

  return (
    <div className="manage-products">
      <div className="top-bar">
        <h1>Manage Products</h1>

        <Link to="/admin/add-product" className="add-btn">
          + Add Product
        </Link>
      </div>

      <table>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>
                <img
                  src={
                    product.imagesUrl ||
                    product.image ||
                    "/images/placeholder.png"
                  }
                  alt={product.name}
                />
              </td>

              <td>{product.name}</td>

              <td>{product.category}</td>

              <td>₹{product.price}</td>

              <td>{product.stock}</td>

              <td>
                <Link
                  className="edit-btn"
                  to={`/admin/edit-product/${product._id}`}
                >
                  Edit
                </Link>

                <button
                  className="delete-btn"
                  onClick={() => handleDelete(product._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageProducts;
