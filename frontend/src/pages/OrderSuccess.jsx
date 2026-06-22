import React from "react";
import { Link } from "react-router-dom";
import "../styles/ordersuccess.css";

const OrderSuccess = () => {
  return (
    <div className="success-container">
      <div className="success-box">
        <div className="check-icon">✔</div>

        <h1>Order Placed Successfully!</h1>
        <p>Thank you for your purchase. Your order has been confirmed.</p>

        <div className="success-actions">
          <Link to="/orders" className="btn">
            View Orders
          </Link>

          <Link to="/" className="btn secondary">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
