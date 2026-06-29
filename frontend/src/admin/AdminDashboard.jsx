import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authcontext";
import "../styles/adminDashboard.css";

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [stats, setStats] = useState(null);

  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/");
      return;
    }

    const fetchStats = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/analytics`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        const data = await res.json();

        if (res.ok) {
          setStats(data);
        } else {
          if (res.status === 401) {
            navigate("/login");
          }

          setStats({
            totalOrders: 0,
            totalProducts: 0,
            totalUsers: 0,
            totalRevenue: 0,
          });
        }
      } catch (error) {
        console.error(error);

        setStats({
          totalOrders: 0,
          totalProducts: 0,
          totalUsers: 0,
          totalRevenue: 0,
        });
      }
    };

    fetchStats();
  }, [user, navigate]);

  if (!stats) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <p>Welcome back, {user?.name}</p>
      </div>

      {/* Statistics */}

      <div className="stats-grid">
        <div className="stat-card orange">
          <h2>{stats.totalOrders}</h2>
          <p>Total Orders</p>
        </div>

        <div className="stat-card blue">
          <h2>{stats.totalProducts}</h2>
          <p>Total Products</p>
        </div>

        <div className="stat-card green">
          <h2>{stats.totalUsers}</h2>
          <p>Total Users</p>
        </div>

        <div className="stat-card purple">
          <h2>₹{stats.totalRevenue}</h2>
          <p>Total Revenue</p>
        </div>
      </div>

      {/* Controls */}

      <div className="controls">
        <h2>Administrative Controls</h2>

        <div className="control-grid">
          <Link to="/admin/add-product" className="control-card">
            <span>📦</span>
            <h3>Add Product</h3>
            <p>Create a new product for your store.</p>
          </Link>

          <Link to="/admin/products" className="control-card">
            <span>🛍️</span>
            <h3>Manage Products</h3>
            <p>Edit or remove existing products.</p>
          </Link>

          <Link to="/admin/orders" className="control-card">
            <span>📋</span>
            <h3>Manage Orders</h3>
            <p>View and update customer orders.</p>
          </Link>

          <Link to="/admin/users" className="control-card">
            <span>👥</span>
            <h3>Users Directory</h3>
            <p>View all registered users.</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
