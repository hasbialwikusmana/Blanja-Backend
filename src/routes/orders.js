const express = require("express");
const router = express.Router();
const ordersControllers = require("../controllers/orders");
const { protect } = require("../middlewares/auth");
const { authorizeRole } = require("../middlewares/authorizeRole");

router.get("/", protect, ordersControllers.getAllOrders);
router.get("/seller", protect, ordersControllers.getOrderBySellerId);
router.get("/:id", protect, ordersControllers.getOrderById);
router.post("/", protect, ordersControllers.insertOrder);
router.put("/:id", protect, authorizeRole(["seller"]), ordersControllers.updateOrder);
router.delete("/:id", protect, authorizeRole(["customer"]), ordersControllers.deleteOrder);

module.exports = router;
