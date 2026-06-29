import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../conponents/productcard";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/products`);
        const data = await res.json();

        setProducts(data.slice(0, 4));
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="home">
      <div className="hero">
        <div className="hero-content">
          <h1>Where Trends Come to Life</h1>
          <p>Discover the latest fashion trends and elevate your style.</p>
          <Link to="/shop" className="btn">
            Start Shopping
          </Link>
        </div>
      </div>

      <h2 className="section-title">Featured Products</h2>

      {loading ? (
        <h2>Loading...</h2>
      ) : (
        <div className="products">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
