const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload");
const usersControllers = require("../controllers/users");
const { protect, isCustomer, isSeller } = require("../middlewares/auth");

router.get("/", usersControllers.user);
router.get("/customer", usersControllers.customer);
router.get("/seller", usersControllers.seller);
router.get("/profile", protect, usersControllers.profile);
router.get("/:id", usersControllers.getselectUsers);
router.put("/profile/:id", protect, upload, usersControllers.updatePhoto);
router.put("/customer/profile", protect, isCustomer, usersControllers.updateProfileCustomer);
router.put("/seller/profile", protect, isSeller, usersControllers.updateProfileSeller);
router.put("/:id", usersControllers.updateUsers);
router.delete("/:id", usersControllers.deleteUsers);

module.exports = router;
