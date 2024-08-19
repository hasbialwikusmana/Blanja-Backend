const express = require("express");
const router = express.Router();
const customerControllers = require("../controllers/customer");
const { protect } = require("../middlewares/auth");
const upload = require("../middlewares/upload");

const { authorizeRole } = require("../middlewares/authorizeRole");

router.get("/", customerControllers.getAllCustomer);
router.post("/register", customerControllers.register);

router.get("/profile", protect, authorizeRole(["customer"]), customerControllers.getProfile);
router.put("/profile", protect, authorizeRole(["customer"]), customerControllers.updateProfile);
router.put("/profile/update-image", protect, authorizeRole(["customer"]), upload.single("photo"), customerControllers.updateProfileImage);

module.exports = router;
