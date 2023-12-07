const router = require("express").Router();

const usersRouter = require("./usersRouter");
const customerRoute = require("./customerRoute");
// const sellerRoute = require("./sellerRoute");

router.use("/auth", usersRouter);
router.use("/customer", customerRoute);
// router.use("/seller", sellerRoute);

module.exports = router;
