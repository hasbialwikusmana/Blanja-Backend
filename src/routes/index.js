const express = require("express");
const router = express.Router();

// Import semua rute yang telah dibuat
const authRouter = require("./auth");
const customerRouter = require("./customer");
const sellerRouter = require("./seller");
const categoryRouter = require("./category");
const productRouter = require("./product");
const sliderRouter = require("./slider");
const addressRouter = require("./address");
const orderRouter = require("./orders");

// Grupkan rute berdasarkan fungsionalitas
router.use("/auth", authRouter);
router.use("/customers", customerRouter);
router.use("/sellers", sellerRouter);
router.use("/category", categoryRouter);
router.use("/products", productRouter);
router.use("/sliders", sliderRouter);
router.use("/address", addressRouter);
router.use("/orders", orderRouter);

module.exports = router;
