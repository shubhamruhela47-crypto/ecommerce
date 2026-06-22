const sendmail = require("../unite/sendmail");

const mongoose = require("mongoose");
const Order = require("../model/order");

const createorder = async (req, res) => {
  try {
    const { items, totalAmount, address, paymentId } = req.body;

    if (
      !items ||
      items.length === 0 ||
      !totalAmount ||
      !address ||
      !paymentId
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    } else {
      const order = new Order({
        user: req.user._id,

        items,

        totalAmount,

        address,

        paymentId,
      });

      await order.save();
      const message = `Dear ${req.user.name},Thank you for your order! 🎉Order Details:- Order ID: ${order._id}- Total Amount: ₹${totalAmount}- Shipping Address: ${address}We will notify you once your order is shipped.Thank you for shopping with us!`;

      await sendmail(req.user.email, "Order Created", message);

      res.status(201).json({
        success: true,
        message: "Order created successfully",
        order,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating order",
      error: error.message,
    });
  }
};

const myorders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).populate(
      "items.productId",
      "name price",
    );

    res.json(orders);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Error fetching orders",
      error: error.message,
    });
  }
};

const getorders = async (req, res) => {
  try {
    const orders = await Order.find().populate("user", "id name ");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching all orders", error });
  }
};

const updateorderstatus = async (req, res) => {
  try {
    const { status } = req.body;

    const order = await Order.findById(req.params.id);

    if (order) {
      order.status = status;

      await order.save();

      res.status(200).json({
        success: true,
        message: "Order status updated",
        order,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating order status",
      error: error.message,
    });
  }
};

const getordersbyid = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid order id" });
    }

    const order = await Order.findById(id)
      .populate("user", "name email")
      .populate("items.productId", "name price");
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json(order);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching order", error: error.message });
  }
};

module.exports = {
  createorder,
  myorders,
  getorders,
  getordersbyid,
  updateorderstatus,
};
