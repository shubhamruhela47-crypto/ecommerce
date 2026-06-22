import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from "./pages/about";
import Home from "./pages/home";
import Shop from "./pages/shop";
import ReturnPolicy from "./pages/ReturnPolicy";
import Disclaimer from "./pages/Disclaimer";
import Login from "./pages/login";
import Register from "./pages/Register";
import Navbar from "./conponents/navbar";
import Footer from "./conponents/footer";
import ProductDetails from "./pages/productdetails";
import Cart from "./pages/cart";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import MyProfile from "./pages/MyProfile";
import AdminDashboard from "./admin/AdminDashboard";
import AddProduct from "./admin/AddProduct";
import ManageProducts from "./admin/ManageProducts";
import EditProduct from "./admin/EditProduct";
import ManageOrders from "./admin/ManageOrders";
import UsersDirectory from "./admin/UsersDirectory";
function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/profile" element={<MyProfile />} />
        <Route path="/return-policy" element={<ReturnPolicy />} />
        <Route path="/disclaimer" element={<Disclaimer />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="submit" element={<OrderSuccess />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/add-product" element={<AddProduct />} />
        <Route path="/admin/edit-product/:id" element={<EditProduct />} />
        <Route path="/admin/products" element={<ManageProducts />} />
        <Route path="/admin/orders" element={<ManageOrders />} />
        <Route path="/admin/users" element={<UsersDirectory />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
