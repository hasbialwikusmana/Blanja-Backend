const express = require("express");
const router = express.Router();
const categoryControllers = require("../controllers/category");
const { protect } = require("../middlewares/auth");
const upload = require("../middlewares/upload");

router.get("/", categoryControllers.getAllCategory);
router.get("/:id", categoryControllers.getCategoryById);
router.post("/", protect, upload.single("photo"), categoryControllers.createCategory);
router.put("/:id", protect, upload.single("photo"), categoryControllers.updateCategory);
router.delete("/:id", protect, categoryControllers.deleteCategory);

module.exports = router;
