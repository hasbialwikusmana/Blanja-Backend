const express = require("express");
const router = express.Router();
const productsControllers = require("../controllers/products");
const { protect } = require("../middlewares/auth");
const upload = require("../middlewares/upload");

router.get("/", productsControllers.getAllProduct);
router.get("/:id", productsControllers.getProduct);
router.post("/", protect, upload, productsControllers.insertProduct);
router.put("/:id", protect, upload, productsControllers.updateProduct);
router.delete("/:id", protect, productsControllers.deleteProduct);

module.exports = router;
