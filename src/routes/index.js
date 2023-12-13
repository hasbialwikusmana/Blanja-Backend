const router = require("express").Router();

const authRouter = require("./authRouter");
const usersRouter = require("./usersRoute");
const productsRouter = require("./productsRouter");
const categoryRouter = require("./categoryRouter");
const ordersRouter = require("./ordersRouter");

router.use("/auth", authRouter);
router.use("/users", usersRouter);
router.use("/products", productsRouter);
router.use("/category", categoryRouter);
router.use("/orders", ordersRouter);

module.exports = router;
