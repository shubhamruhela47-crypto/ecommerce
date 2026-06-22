const express = require("express");
const {
  createOrder,
  verifypayment,
} = require("../controller/paymentController");
const router = express.Router();

router.post("/order", createOrder);
router.post("/verify", verifypayment);

module.exports = router;
