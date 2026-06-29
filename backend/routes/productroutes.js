const express = require('express');
const router = express.Router();
const { protect } = require('../middlewere/authmiddlewere');
const { admin } = require("../middlewere/adminmiddlewere");
const {
    getproducts,
    getproductbyid,
    updateproduct,
    deleteproduct,
    createproduct
} = require("../controller/productcontroller.js");
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.route('/')
    .get(getproducts)
    .post(protect, admin, upload.any(), createproduct);

router.route('/:id')
    .get(getproductbyid)
    .put(protect, admin, upload.any(), updateproduct)
    .delete(protect, admin, deleteproduct);

module.exports = router;
