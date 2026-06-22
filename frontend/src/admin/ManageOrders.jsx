import React, { useContext, useEffect, useState, useCallback } from "react";
import { AuthContext } from "../context/authcontext";
import "../styles/manageOrders.css";

const ManageOrders = () => {
  const { user } = useContext(AuthContext);

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = useCallback(async () => {
    try {
      const res = await fetch("/api/orders", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      const data = await res.json();

      if (res.ok) {
        setOrders(data);
      }
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  }, [user?.token]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const updateStatus = async (id, status) => {
    try {
      const res = await fetch(`/api/orders/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ status }),
      });

      if (res.ok) {
        fetchOrders();
      }
    } catch (err) {
      console.log(err);
    }
  };

  if (loading) {
    return <h2 className="loading">Loading Orders...</h2>;
  }

  return (
    <div className="manage-orders">
      <h1>Manage Orders</h1>

      <table>
        <thead>
          <tr>
            <th>Customer</th>
            <th>Total</th>
            <th>Payment</th>
            <th>Status</th>
            <th>Update</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td>{order.user?.name}</td>

              <td>₹{order.totalAmount}</td>

              <td>{order.paymentStatus}</td>

              <td>{order.status}</td>

              <td>
                <select
                  value={order.status}
                  onChange={(e) => updateStatus(order._id, e.target.value)}
                >
                  <option>Pending</option>
                  <option>Processing</option>
                  <option>Shipped</option>
                  <option>Delivered</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageOrders;
