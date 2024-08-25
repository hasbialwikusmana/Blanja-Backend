const express = require("express");
const router = express.Router();
const ordersControllers = require("../controllers/orders");
const { protect } = require("../middlewares/auth");

router.get("/", protect, ordersControllers.getAllOrders);
router.get("/customer", protect, ordersControllers.getOrderByCustomerId);
router.get("/seller", protect, ordersControllers.getOrderBySellerId);
router.get("/:id", protect, ordersControllers.getOrderById);
router.post("/", protect, ordersControllers.insertOrder);
router.put("/:id", protect, ordersControllers.updateOrder);
router.delete("/:id", protect, ordersControllers.deleteOrder);

module.exports = router;
