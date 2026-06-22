const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const connectDB = require("./config/db");

dotenv.config({ path: path.join(__dirname, ".env") });
connectDB();

const app = express();
app.use(
  cors({
    origin: ["http://localhost:3000", "http://127.0.0.1:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded images/static files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/", (req, res) => {
  res.send("my name is shiv");
});
app.use("/api/auth", require("./routes/authroutes"));
app.use("/api/products", require("./routes/productroutes"));
app.use("/api/orders", require("./routes/ordersroutes"));
app.use("/api/payment", require("./routes/paymentroutes.js"));
app.use("/api/analysis", require("./routes/analysesroutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(` server is running on port ${PORT} `);
});
