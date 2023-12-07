const express = require("express");
const router = express.Router();
const usersControllers = require("../controllers/usersControllers");

router

  .post("/auth/register-customer", usersControllers.registerCustomer)
  .post("/auth/register-seller", usersControllers.registerSeller)
  .post("/auth/login", usersControllers.login)
  .post("/auth/refresh-token", usersControllers.refreshToken);

module.exports = router;
