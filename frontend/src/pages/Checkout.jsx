import React, { useContext, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authcontext";
import { clearCart } from "../redux/cartSlice";
import "../styles/checkout.css";

const Checkout = () => {
  const { user } = useContext(AuthContext);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [address, setAddress] = useState({
    fullname: "",
    street: "",
    city: "",
    postalcode: "",
    country: "",
  });

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0,
  );

  // ✅ BYPASS PAYMENT (TEST MODE ONLY)
  const bypassPayment = async () => {
    try {
      const fakeResponse = {
        razorpay_payment_id: "BYPASS_" + Date.now(),
      };

      console.log("[Checkout] bypassPayment user:", user);
      console.log("[Checkout] bypassPayment payload:", {
        items: cartItems,
        totalAmount: totalPrice,
        address,
        paymentId: fakeResponse.razorpay_payment_id,
        paymentMode: "bypass",
      });

const saveOrderRes = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
        body: JSON.stringify({
          items: cartItems,
          totalAmount: totalPrice,
          address,
          paymentId: fakeResponse.razorpay_payment_id,
          paymentMode: "bypass",
        }),
      });

      if (saveOrderRes.ok) {
        dispatch(clearCart());
        navigate("/ordersuccess");
      } else {
        const txt = await saveOrderRes.text().catch(() => "<no body>");
        console.error(
          "[Checkout] saveOrderRes failed",
          saveOrderRes.status,
          txt,
        );
        alert("Order failed in bypass mode: " + (txt || saveOrderRes.status));
      }
    } catch (error) {
      console.error("Bypass error:", error);
    }
  };

  // ✅ RAZORPAY PAYMENT
  const handlePayment = async () => {
    try {
const orderRes = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/payment/order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: totalPrice }),
      });

      const respJson = await orderRes.json();

      if (!orderRes.ok) {
        const fallback = window.confirm(
          "Razorpay not configured. Use test mode?",
        );

        if (fallback) return bypassPayment();
        return alert("Payment failed");
      }

      // Response shape: { order, key_id }
      const order = respJson.order || respJson;
      const keyId = respJson.key_id || process.env.REACT_APP_RAZORPAY_KEY_ID;

      if (!keyId) {
        console.error("[Checkout] No Razorpay key available", respJson);
        const fallback = window.confirm(
          "Razorpay not configured. Use test mode?",
        );
        if (fallback) return bypassPayment();
        return alert("Payment failed: no key configured");
      }

      // Ensure Razorpay script is loaded
      const loadRazorpay = () =>
        new Promise((resolve, reject) => {
          if (window.Razorpay) return resolve();

          const script = document.createElement("script");
          script.src = "https://checkout.razorpay.com/v1/checkout.js";
          script.async = true;
          script.onload = () => resolve();
          script.onerror = () =>
            reject(new Error("Failed to load Razorpay script"));
          document.body.appendChild(script);
        });

      try {
        await loadRazorpay();
      } catch (err) {
        console.error("[Checkout] Razorpay script load failed:", err);
        const fallback = window.confirm(
          "Razorpay script failed to load. Use test mode?",
        );
        if (fallback) return bypassPayment();
        return alert("Payment failed: Razorpay unavailable");
      }

      const options = {
        key: keyId,
        amount: order.amount,
        currency: order.currency,
        name: "ShopNest",
        description: "Order Payment",
        order_id: order.id,

        prefill: {
          name: address.fullname,
          email: user?.email,
          contact: "9999999999",
        },

        theme: {
          color: "#f97316",
        },

        handler: async function (response) {
          try {
            const verifyRes = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/payment/verify`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(response),
            });

            if (!verifyRes.ok) {
              alert("Payment verification failed");
              return;
            }
const saveOrderRes = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/orders`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user.token}`,
              },
              body: JSON.stringify({
                items: cartItems,
                totalAmount: totalPrice,
                address,
                paymentId: response.razorpay_payment_id,
              }),
            });

            if (saveOrderRes.ok) {
              dispatch(clearCart());
              navigate("/ordersuccess");
            } else {
              const txt = await saveOrderRes.text().catch(() => "<no body>");
              console.error(
                "[Checkout] saveOrderRes failed",
                saveOrderRes.status,
                txt,
              );
              alert("Order saving failed: " + (txt || saveOrderRes.status));
            }
          } catch (err) {
            console.error(err);
          }
        },
      };

      // Normalize the Razorpay constructor - some bundlers or script loads
      // may expose it under `.default` or `.Razorpay`. Try common locations.
      const RazorpayCtor =
        (window.Razorpay &&
          (window.Razorpay.default ||
            window.Razorpay.Razorpay ||
            window.Razorpay)) ||
        null;

      if (typeof RazorpayCtor !== "function") {
        console.error(
          "[Checkout] window.Razorpay is not a constructor after loading script",
          "window.Razorpay:",
          window.Razorpay,
        );
        const fallback = window.confirm(
          "Razorpay not available. Use test mode?",
        );
        if (fallback) return bypassPayment();
        return alert("Payment failed: Razorpay not available");
      }

      const rzpl = new RazorpayCtor(options);
      rzpl.open();
    } catch (error) {
      console.error("Payment error:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!user) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    handlePayment();
  };

  return (
    <div className="checkout-container">
      <div className="breadcrumb">
        <Link to="/">Home</Link> / <Link to="/cart">Cart</Link> / Checkout
      </div>

      <div className="checkout-box">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Full Name"
            value={address.fullname}
            onChange={(e) =>
              setAddress({ ...address, fullname: e.target.value })
            }
            required
          />

          <input
            type="text"
            placeholder="Street"
            value={address.street}
            onChange={(e) => setAddress({ ...address, street: e.target.value })}
            required
          />

          <input
            type="text"
            placeholder="City"
            value={address.city}
            onChange={(e) => setAddress({ ...address, city: e.target.value })}
            required
          />

          <input
            type="text"
            placeholder="Postal Code"
            value={address.postalcode}
            onChange={(e) =>
              setAddress({ ...address, postalcode: e.target.value })
            }
            required
          />

          <input
            type="text"
            placeholder="Country"
            value={address.country}
            onChange={(e) =>
              setAddress({ ...address, country: e.target.value })
            }
            required
          />

          <hr />

          <div className="checkout-footer">
            <h2>Total To Pay: ₹{totalPrice.toFixed(2)}</h2>
            <button type="submit">Pay Now</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
