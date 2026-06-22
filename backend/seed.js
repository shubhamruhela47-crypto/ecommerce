const dotenv = require("dotenv");
dotenv.config();

const connectDB = require("./config/db");

const Product = require("./model/product");
const User = require("./model/user");
const Order = require("./model/order");

const bcrypt = require("bcryptjs");

const seedData = async () => {
  try {
    // Delete old data
    await Product.deleteMany({});
    await User.deleteMany({});
    await Order.deleteMany({});

    // Create users
    const users = [
      {
        name: "Admin User",
        email: "admin@example.com",
        password: bcrypt.hashSync("password123", 10),
        role: "admin",
        verified: true,
      },
      {
        name: "John Doe",
        email: "john@example.com",
        password: bcrypt.hashSync("password123", 10),
        role: "user",
      },
      {
        name: "Jane Smith",
        email: "jane@example.com",
        password: bcrypt.hashSync("password123", 10),
        role: "user",
      },
    ];

    const createdUsers = await User.insertMany(users);

    // Create products
    const products = [
      {
        name: "Wireless Headphones",
        description: "Comfortable wireless headphones with great sound.",
        price: 1999,
        category: "Electronics",
        stock: 25,
        imagesUrl: "uploads/headphone.jpg",
      },
      {
        name: "Classic T-Shirt",
        description: "100% cotton classic t-shirt.",
        price: 499,
        category: "Clothing",
        stock: 100,
        imagesUrl: "uploads/tshirt.jpg",
      },
      {
        name: "Coffee Mug",
        description: "Ceramic coffee mug.",
        price: 249,
        category: "Home",
        stock: 60,
        imagesUrl: "uploads/mug.jpg",
      },
      {
        name: "Running Shoes",
        description: "Lightweight running shoes.",
        price: 3499,
        category: "Footwear",
        stock: 40,
        imagesUrl: "uploads/shoes.jpg",
      },
    ];

    const createdProducts = await Product.insertMany(products);

    // Create order
    const order = {
      user: createdUsers[1]._id,

      items: [
        {
          productId: createdProducts[0]._id,
          quantity: 2,
          price: createdProducts[0].price,
        },
      ],

      totalAmount: createdProducts[0].price * 2,

      address: {
        fullName: "John Doe",
        street: "123 Main Street",
        postalCode: "400001",
        city: "Mumbai",
        country: "India",
      },

      paymentId: "test_payment_001",

      status: "pending",
    };

    await Order.create(order);

    console.log("Seeding Finished Successfully");

    process.exit();
  } catch (error) {
    console.log("Seeding Error:", error.message);

    process.exit(1);
  }
};

// Connect DB then seed data
connectDB().then(() => {
  seedData();
});
