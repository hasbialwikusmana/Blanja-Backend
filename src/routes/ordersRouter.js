const express = require("express");
const router = express.Router();
const ordersControllers = require("../controllers/orders");
const { protect } = require("../middlewares/auth");

router.get("/",protect, ordersControllers.getAllOrder);
router.get("/:id",protect, ordersControllers.getDetailOrder);
router.post("/",protect, ordersControllers.createOrder);
router.put("/:id", protect,ordersControllers.updateOrder);
router.delete("/:id",protect, ordersControllers.deleteOrder);

module.exports = router;
