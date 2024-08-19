const express = require("express");
const router = express.Router();
const productsControllers = require("../controllers/products");
const { protect } = require("../middlewares/auth");
const upload = require("../middlewares/upload");

const { authorizeRole } = require("../middlewares/authorizeRole");

router.get("/", productsControllers.getAllProduct);
router.get("/seller", protect, authorizeRole(["seller"]), productsControllers.getProductBySellerId);
router.get("/:id", protect, productsControllers.getProductById);
router.get("/category/:category_id", protect, productsControllers.getAllProductByCategoryId);
router.post("/", protect, authorizeRole(["seller"]), upload.single("photo"), productsControllers.createProduct);
router.put("/:id", protect, authorizeRole(["seller"]), upload.single("photo"), productsControllers.updateProduct);
router.delete("/:id", protect, authorizeRole(["seller"]), productsControllers.deleteProduct);

module.exports = router;
