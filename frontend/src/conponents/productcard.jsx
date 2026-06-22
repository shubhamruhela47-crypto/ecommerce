import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
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
    <>
      <style>{`
        .card{
          width:280px;
          background:#111827;
          border-radius:12px;
          overflow:hidden;
          box-shadow:0 5px 15px rgba(0,0,0,.3);
          transition:.3s;
          margin:15px;
        }

        .card:hover{
          transform:translateY(-6px);
          box-shadow:0 10px 25px rgba(255,102,0,.25);
        }

        /* IMAGE */
        .card-image{
          width:100%;
          height:240px;
          object-fit:cover;
          display:block;
          background:#000;
        }

        /* DETAILS BELOW IMAGE */
        .card-info{
          padding:18px;
          text-align:center;
          background:#111827;
        }

        .card-title{
          color:#fff;
          font-size:20px;
          margin-bottom:10px;
          font-weight:600;
        }

        .card-price{
          color:#ff6b35;
          font-size:22px;
          font-weight:bold;
          margin-bottom:18px;
        }

        .card-btn{
          display:block;
          text-decoration:none;
          padding:12px;
          border-radius:6px;
          background:#ff6b35;
          color:white;
          font-weight:bold;
          transition:.3s;
        }

        .card-btn:hover{
          background:#e65c00;
        }
      `}</style>

      <div className="card">
        <img src={image} alt={product.name} className="card-image" />

        <div className="card-info">
          <h3 className="card-title">{product.name}</h3>

          <p className="card-price">₹ {Number(product.price).toFixed(2)}</p>

          <Link to={`/product/${product._id}`} className="card-btn">
            View Details
          </Link>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
