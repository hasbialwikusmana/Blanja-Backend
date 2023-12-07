const express = require("express");
const router = express.Router();
const authControllers = require("../controllers/auth");

router.post("/register-customer", authControllers.registerCustomer);
router.post("/register-seller", authControllers.registerSeller);
router.post("/login", authControllers.login);
router.post("/refresh-token", authControllers.refreshToken);

module.exports = router;
