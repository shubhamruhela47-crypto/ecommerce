import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import "../styles/productDetails.css";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${id}`);
        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    const maybe =
      product.imageUrl ||
      product.imagesUrl ||
      product.imagesURL ||
      product.image ||
      (Array.isArray(product.images) && product.images[0]) ||
      (Array.isArray(product.imagesUrl) && product.imagesUrl[0]);

    const imageUrl = maybe
      ? /^https?:\/\//i.test(maybe)
        ? maybe
        : `${process.env.REACT_APP_BACKEND_URL || "http://localhost:5000"}/${String(maybe).replace(/^\//, "")}`
      : "/images/placeholder.png";

    dispatch(
      addToCart({
        productId: product._id,
        name: product.name,
        price: product.price,
        imageUrl,
        qty: 1,
      }),
    );

    alert("Successfully Added To Cart");
  };

  if (loading) {
    return (
      <div className="product-container">
        <h2>Loading...</h2>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="product-container">
        <h2>Product Not Found</h2>
      </div>
    );
  }

  const image = (() => {
    const maybe =
      product.imageUrl ||
      product.imagesUrl ||
      product.imagesURL ||
      product.image ||
      (Array.isArray(product.images) && product.images[0]) ||
      (Array.isArray(product.imagesUrl) && product.imagesUrl[0]);

    if (!maybe) return "/images/placeholder.png";

    if (/^https?:\/\//i.test(maybe)) return maybe;

    const backend =
      process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";

    return `${backend}/${String(maybe).replace(/^\//, "")}`;
  })();

  return (
    <div className="product-container">
      <div className="breadcrumb">
        <Link to="/">Home</Link>
        <span> / </span>

        <Link to="/shop">Shop</Link>
        <span> / </span>

        <span>{product.name}</span>
      </div>

      <div className="product-card">
        <div className="product-image">
          <img src={image} alt={product.name} />
        </div>

        <div className="product-info">
          <h1>{product.name}</h1>

          <h2 className="price">₹ {product.price}</h2>

          <h3>Product Description</h3>

          <p className="desc">{product.description}</p>

          <button className="buy-btn" onClick={handleAddToCart}>
            Add To Shopping Cart
          </button>

          <p className="stock">✔ In Stock</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
