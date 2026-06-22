import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/authcontext";
import { useNavigate } from "react-router-dom";
import "../styles/profile.css";

const MyProfile = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    fetch("/api/orders/myorders", {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setOrders(data))
      .catch((err) => console.log(err));
  }, [user, navigate]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <h1>My Profile</h1>

          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>

        <div className="profile-info">
          <h3>Name: {user?.name}</h3>
          <h3>Email: {user?.email}</h3>

          <span className="role-badge">
            Account Type: {user?.isAdmin ? "ADMIN" : "USER"}
          </span>
        </div>

        <hr />

        <h2 className="order-title">Order History</h2>

        {orders.length === 0 ? (
          <p>No Orders Yet</p>
        ) : (
          orders.map((order) => (
            <div className="order-card" key={order._id}>
              <div>
                <p>
                  <strong>Order ID:</strong> {order._id}
                </p>

                <p>
                  Placed On: {new Date(order.createdAt).toLocaleDateString()}
                </p>

                <p className="price">Total: ₹{order.totalAmount}</p>
              </div>

              <span className="status">{order.status || "Pending"}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyProfile;
