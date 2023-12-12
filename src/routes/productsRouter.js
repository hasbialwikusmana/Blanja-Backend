const express = require("express");
const router = express.Router();
const productsControllers = require("../controllers/products");
const { protect, isSeller } = require("../middlewares/auth");
const upload = require("../middlewares/upload");

router.get("/", productsControllers.getAllProduct);
router.get("/:id", productsControllers.getProduct);
router.get("/category/:id", productsControllers.getCategory);
router.post("/", protect, isSeller, upload, productsControllers.insertProduct);
router.put("/:id", protect, upload, productsControllers.updateProduct);
router.delete("/:id", protect, productsControllers.deleteProduct);

module.exports = router;
