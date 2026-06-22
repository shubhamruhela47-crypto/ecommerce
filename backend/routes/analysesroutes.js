const express = require("express");
const { protect } = require("../middlewere/authmiddlewere");
const { admin } = require("../middlewere/adminmiddlewere");
const { getadminstatus } = require("../controller/analysiscontroller");

const router = express.Router();

router.get("/", protect, admin, getadminstatus);

module.exports = router;
