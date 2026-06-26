const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const connectDB = require("./config/db");

// Load environment variables
dotenv.config({ path: path.join(__dirname, ".env") });

// Connect to Database
connectDB();

const app = express();

// Set CORS for frontend URL / allow single-node deploy (जैसा नए स्क्रीनशॉट में है)
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://127.0.0.1:3000",
      process.env.FRONTEND_URL,
    ],
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded images/static files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// API Routes
app.use("/api/auth", require("./routes/authroutes"));
app.use("/api/products", require("./routes/productroutes"));
app.use("/api/orders", require("./routes/ordersroutes"));
app.use("/api/payment", require("./routes/paymentroutes.js"));
app.use("/api/analytics", require("./routes/analysesroutes")); // वीडियो के अनुसार 'analytics' किया गया

// Serve frontend in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("ShopNest API is running in Development mode...");
  });
}

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(` server is running on port ${PORT} `);
});
