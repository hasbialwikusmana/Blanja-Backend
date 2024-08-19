const express = require("express");
const router = express.Router();
const slidersControllers = require("../controllers/sliders");
const { protect } = require("../middlewares/auth");
const upload = require("../middlewares/upload");

router.get("/", slidersControllers.getAllSliders);
router.get("/:id", slidersControllers.getSlidersById);
router.post("/", protect, upload.single("photo"), slidersControllers.createSliders);
router.put("/:id", protect, upload.single("photo"), slidersControllers.updateSliders);
router.delete("/:id", protect, slidersControllers.deleteSliders);

module.exports = router;
