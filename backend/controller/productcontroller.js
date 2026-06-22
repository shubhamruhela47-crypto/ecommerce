const Product = require("../model/product");
const cloudinary = require("../config/cloudinary");
const fs = require("fs/promises");
const mongoose = require("mongoose");

const removeUploadedFile = async (file) => {
  if (!file?.path) {
    return;
  }

  try {
    await fs.unlink(file.path);
  } catch (error) {
    console.error("Temp file cleanup error:", error.message);
  }
};

const uploadProductImage = async (file) => {
  try {
    const result = await cloudinary.uploader.upload(file.path, {
      folder: "shopnext/products",
    });

    return result.secure_url;
  } catch (error) {
    const statusCode = error.http_code || error.statusCode;

    if (statusCode === 401 || statusCode === 403) {
      const cloudinaryError = new Error(
        "Cloudinary upload failed. Please check CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET in backend/.env.",
      );
      cloudinaryError.statusCode = 502;
      throw cloudinaryError;
    }

    throw error;
  } finally {
    await removeUploadedFile(file);
  }
};

const getproducts = async (req, res) => {
  try {
    const products = await Product.find({});

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({
      message: "server error",
    });
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
  const { name, description, price, category, stock } = req.body;

  try {
    if (!name || !description || !price || !category || !stock) {
      return res.status(400).json({
        message: "name, description, price, category, and stock are required.",
      });
    }

    const file = req.file || (req.files && req.files[0]);

    if (!file) {
      return res.status(400).json({
        message:
          "Product image is required. Send a multipart/form-data file under any field name.",
      });
    }

    const imagesUrl = await uploadProductImage(file);

    const product = new Product({
      name,
      description,
      price,
      category,
      stock,
      imagesUrl,
    });
    const saveproduct = await product.save();
    res.status(201).json(saveproduct);
  } catch (error) {
    console.error("Create product error:", error.message);
    res.status(error.statusCode || 500).json({
      message: error.message || "Server Error",
    });
  }
};

const updateproduct = async (req, res) => {
  try {
    const { name, description, price, category, stock } = req.body;

    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid product id" });
    }

    const product = await Product.findById(req.params.id);

    if (product) {
      product.name = name || product.name;

      product.description = description || product.description;

      product.price = price || product.price;

      product.category = category || product.category;

      product.stock = stock || product.stock;

      const file = req.file || (req.files && req.files[0]);
      if (file) {
        product.imagesUrl = await uploadProductImage(file);
      }

      const updatedproduct = await product.save();

      res.json(updatedproduct);
    } else {
      res.status(404).json({
        message: "Product not found",
      });
    }
  } catch (error) {
    console.error("Update product error:", error.message);
    res.status(error.statusCode || 500).json({
      message: error.message || "Server Error",
    });
  }
};

const deleteproduct = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid product id" });
    }

    const product = await Product.findById(req.params.id);

    if (product) {
      await product.deleteOne();

      res.json({
        message: "product removed",
      });
    } else {
      res.status(404).json({
        message: "product not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "server error",
    });
  }
};

module.exports = {
  getproducts,
  getproductbyid,
  createproduct,
  updateproduct,
  deleteproduct,
};
