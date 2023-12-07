const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload");
const categoryControllers = require("../controllers/category");
// const { protect } = require("../middlewares/auth");

router.get("/", categoryControllers.getAllCategory);
router.get("/:id", categoryControllers.getCategory);
router.post("/", upload, categoryControllers.insertCategory);
router.put("/:id", upload, categoryControllers.updateCategory);
router.delete("/:id", categoryControllers.deleteCategory);

module.exports = router;
