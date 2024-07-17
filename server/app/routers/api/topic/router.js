const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import item-related actions
const { add } = require("../../../controllers/topicActions");
const userIdCookie = require("../../../services/userIdcookie");
// Route to add a new item
router.post("/", userIdCookie, add);

/* ************************************************************************* */

module.exports = router;
