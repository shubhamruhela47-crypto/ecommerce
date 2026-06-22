import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { AuthContext } from "../context/authcontext";
import "../styles/navbar.css";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  const cartItems = useSelector((state) => state.cart.cartItems);

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="navbar-logo">
        <Link to="/">
          <img
            src="/images/shopping.png"
            alt="ShopNext"
            className="logo-image"
          />
          <span>Trendora</span>
        </Link>
      </div>

      {/* Links */}
      <ul className="navbar-links">
        <li>
          <Link to="/shop">Shop</Link>
        </li>

        <li>
          <Link to="/cart">Cart ({cartItems.length})</Link>
        </li>

        {user ? (
          <>
            <li>
              <Link to="/profile">Hi, {user.name}</Link>
            </li>

            {user.role === "admin" && (
              <li>
                <Link to="/admin">Admin</Link>
              </li>
            )}

            <li>
              <button
                type="button"
                onClick={handleLogout}
                className="btn-logout"
              >
                Logout
              </button>
            </li>
          </>
        ) : (
          <li>
            <Link to="/login">Login</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
