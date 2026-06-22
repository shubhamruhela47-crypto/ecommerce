import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { removeFromCart, addToCart } from "../redux/cartSlice";
import "../styles/cart.css";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleUpdateQty = (item, qty) => {
    if (qty > 0) {
      dispatch(
        addToCart({
          ...item,
          qty,
        }),
      );
    }
  };

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0,
  );

  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>

      {cartItems.length === 0 ? (
        <p className="empty-cart">
          Your cart is empty. <Link to="/shop">Go Shopping</Link>
        </p>
      ) : (
        <div className="cart-layout">
          {/* Left Side */}
          <div className="cart-items">
            {cartItems.map((item) => (
              <div className="cart-item" key={item.productId}>
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="cart-item-image"
                />

                <div className="cart-item-details">
                  <h4>{item.name}</h4>

                  <p className="price">₹{item.price}</p>

                  <div className="qty-controls">
                    <button onClick={() => handleUpdateQty(item, item.qty - 1)}>
                      -
                    </button>

                    <span>{item.qty}</span>

                    <button onClick={() => handleUpdateQty(item, item.qty + 1)}>
                      +
                    </button>

                    <button
                      className="remove-btn"
                      onClick={() => handleRemove(item.productId)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Side */}
          <div className="cart-summary">
            <h3>Order Summary</h3>

            <p>Total Items : {cartItems.length}</p>

            <h2>₹{totalPrice.toFixed(2)}</h2>

            <button
              className="checkout-btn"
              onClick={() => navigate("/checkout")}
            >
              Proceed To Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
