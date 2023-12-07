const express = require("express");
const router = express.Router();
const productsControllers = require("../controllers/products");
// const { protect } = require("../middlewares/auth");
const upload = require("../middlewares/upload");

router.get("/", productsControllers.getAllProduct);
router.get("/:id", productsControllers.getProduct);
router.post("/", upload, productsControllers.insertProduct);
router.put("/:id", upload, productsControllers.updateProduct);
router.delete("/:id", productsControllers.deleteProduct);

module.exports = router;
