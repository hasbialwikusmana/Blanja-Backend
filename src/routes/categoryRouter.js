const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload");
const categoryControllers = require("../controllers/category");
const { protect } = require("../middlewares/auth");

router.get("/", categoryControllers.getAllCategory);
router.get("/:id", categoryControllers.getCategory);
router.post("/", protect, upload, categoryControllers.insertCategory);
router.put("/:id", protect, upload, categoryControllers.updateCategory);
router.delete("/:id", protect, categoryControllers.deleteCategory);

module.exports = router;
