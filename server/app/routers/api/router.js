const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Import And Use Routers Here
/* ************************************************************************* */

const userRouter = require("./user/router");
const topicRouter = require("./topic/router");

router.use("/user", userRouter);

router.use("/topic", topicRouter);
/* ************************************************************************* */

module.exports = router;
