const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload");
const customerControllers = require("../controllers/customerControllers");

router.get("/", customerControllers.user);
router.get("/profile", customerControllers.profile);
router.get("/:id", customerControllers.getselectUsers);
router.put("/profile/:id", upload, customerControllers.updatePhoto);
router.put("/:id", customerControllers.updateUsers);

module.exports = router;
