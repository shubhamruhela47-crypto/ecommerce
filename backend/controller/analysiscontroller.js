const Order = require("../model/order");
const User = require("../model/user");
const Product = require("../model/product");

const getadminstatus = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({ role: "user" });

    const totalOrders = await Order.countDocuments({});

    const totalProducts = await Product.countDocuments({});

    const orders = await Order.find({});

    const totalrevenuedata = orders.reduce(
      (acc, order) => acc + order.totalAmount,
      0,
    );

    res.status(200).json({
      success: true,
      totalUsers,
      totalProducts,
      totalOrders,
      totalRevenue: totalrevenuedata,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error });
  }
};

module.exports = {
  getadminstatus,
};
