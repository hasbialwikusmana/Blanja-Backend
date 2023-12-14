const express = require("express");
const router = express.Router();
const shippingAddressControllers = require("../controllers/address");
const { protect } = require("../middlewares/auth");

router
  .get("/", protect,shippingAddressControllers.getAllAddress)
  .get("/:id",protect, shippingAddressControllers.getAddressById)
  .post("/",protect, shippingAddressControllers.insertAddress)
  .put("/:id",protect, shippingAddressControllers.updateAddress)
  .delete("/:id",protect, shippingAddressControllers.deleteAddress);

module.exports = router;
