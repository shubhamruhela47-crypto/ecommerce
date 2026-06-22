const express = require("express");
const { protect } = require("../middlewere/authmiddlewere");

const { admin } = require("../middlewere/adminmiddlewere");

const {
  createorder,
  getorders,
  myorders,
  updateorderstatus,
  getordersbyid,
} = require("../controller/orderscontroller");

const router = express.Router();

router.route("/").post(protect, createorder).get(protect, admin, getorders);

router.route("/myorders").get(protect, myorders);

router.route("/:id").get(protect, getordersbyid);

router.route("/:id/status").put(protect, admin, updateorderstatus);

module.exports = router;
