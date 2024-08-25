const express = require("express");
const router = express.Router();
const addressControllers = require("../controllers/address");
const { protect } = require("../middlewares/auth");
const { authorizeRole } = require("../middlewares/authorizeRole");

router
  .get("/", protect, authorizeRole(["customer"]), addressControllers.getAllAddress)
  .get("/customer", protect, authorizeRole(["customer"]), addressControllers.getAddressByCustomerId)
  .get("/primary-address", protect, authorizeRole(["customer"]), addressControllers.getPrimaryAddressByCustomerId)
  .get("/:id", protect, authorizeRole(["customer"]), addressControllers.getAddressById)
  .post("/", protect, authorizeRole(["customer"]), addressControllers.insertAddress)
  .put("/:id", protect, authorizeRole(["customer"]), addressControllers.updateAddress)
  .delete("/:id", protect, authorizeRole(["customer"]), addressControllers.deleteAddress);

module.exports = router;
