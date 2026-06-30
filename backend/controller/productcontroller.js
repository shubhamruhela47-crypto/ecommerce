const Product = require("../model/product");
const cloudinary = require("../config/cloudinary");
const mongoose = require("mongoose");

const uploadProductImage = async (file) => {
  try {
    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: "shopnext/products" },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );
      uploadStream.end(file.buffer);
    });

    return result.secure_url;
  } catch (error) {
    const statusCode = error.http_code || error.statusCode;

    if (statusCode === 401 || statusCode === 403) {
      const cloudinaryError = new Error(
        "Cloudinary upload failed. Please check CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET in backend/.env."
      );
      cloudinaryError.statusCode = 502;
      throw cloudinaryError;
    }

    throw error;
  }
};

const getproducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
};

const getproductbyid = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid product id" });
    }

    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

const createproduct = async (req, res) => {
  const { name,
