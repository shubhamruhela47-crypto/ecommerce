const express = require("express");
const router = express.Router();
const {
  registeruser,
  loginuser,
  logoutuser,
  deleteuser,
} = require("../controller/authcontroller");
const { protect } = require("../middlewere/authmiddlewere");
const { admin } = require("../middlewere/adminmiddlewere");

router.post("/register", registeruser);
router.post("/login", loginuser);
router.get("/users", protect, admin, logoutuser);
router.delete("/users/:id", protect, admin, deleteuser);

module.exports = router;
