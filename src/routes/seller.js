const express = require("express");
const router = express.Router();
const sellerControllers = require("../controllers/seller");
const { protect } = require("../middlewares/auth");
const upload = require("../middlewares/upload");

const { authorizeRole } = require("../middlewares/authorizeRole");

router.get("/", sellerControllers.getAllSeller);
router.post("/register", sellerControllers.register);

router.get("/profile", protect, authorizeRole(["seller"]), sellerControllers.getProfile);
router.put("/profile", protect, authorizeRole(["seller"]), sellerControllers.updateProfile);
router.put("/profile/update-image", protect, authorizeRole(["seller"]), upload.single("photo"), sellerControllers.updateProfileImage);

module.exports = router;
