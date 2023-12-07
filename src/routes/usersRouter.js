const express = require("express");
const router = express.Router();
// const upload = require("../middlewares/upload");
const usersControllers = require("../controllers/usersControllers");

router
  .get("/users", usersControllers.user)
  // .get("/profile", usersControllers.profile)
  // .get("/:id", usersControllers.getselectUsers)
  // .put("/profile/:id", upload, usersControllers.updateImg)
  // .put("/customer/:id", usersControllers.updateCustInfo)
  .post("/auth/register-customer", usersControllers.registerCustomer)
  .post("/auth/register-seller", usersControllers.registerSeller)
  .post("/auth/login", usersControllers.login)
  .post("/auth/refresh-token", usersControllers.refreshToken);

module.exports = router;
