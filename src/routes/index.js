const router = require("express").Router();

const usersRouter = require("./usersRouter");

router.use("/", usersRouter);
module.exports = router;
