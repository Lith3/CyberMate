const express = require("express");

const path = require("path");

const router = express.Router();

/* ************************************************************************* */
// Import And Use Routers Here
/* ************************************************************************* */

const userRouter = require("./user/router");
const topicRouter = require("./topic/router");
const authRouter = require("./auth/router");

router.use("/user", userRouter);

router.use("/topic", topicRouter);

router.use("/auth", authRouter);

router.use(
  "/avatars",
  express.static(path.join(__dirname, "../../../public/assets/avatars"))
);

/* ************************************************************************* */

module.exports = router;
