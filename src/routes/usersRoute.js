const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload");
const usersControllers = require("../controllers/users");
const { protect } = require("../middlewares/auth");

router.get("/", usersControllers.user);
router.get("/customer", usersControllers.customer);
router.get("/seller", usersControllers.seller);
router.get("/profile", protect, usersControllers.profile);
router.get("/:id", usersControllers.getselectUsers);
router.put("/profile", protect, upload, usersControllers.updatePhoto);
router.put("/:id", usersControllers.updateUsers);
router.delete("/:id", usersControllers.deleteUsers);

module.exports = router;
