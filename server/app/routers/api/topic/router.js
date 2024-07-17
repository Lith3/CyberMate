const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import item-related actions
const { browse, add } = require("../../../controllers/topicActions");
const userIdCookie = require("../../../services/userIdcookie");

// Route to add a new item
router.get("/", browse);
router.post("/", userIdCookie, add);

/* ************************************************************************* */

module.exports = router;
