const router = require("express").Router();

const authRouter = require("./authRouter");
const usersRouter = require("./usersRoute");
const categoryRouter = require("./categoryRouter");

router.use("/auth", authRouter);
router.use("/users", usersRouter);
router.use("/category", categoryRouter);

module.exports = router;
