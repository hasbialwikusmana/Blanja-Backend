const router = require("express").Router();

const authRouter = require("./authRouter");
const usersRoute = require("./usersRoute");

router.use("/auth", authRouter);
router.use("/users", usersRoute);

module.exports = router;
