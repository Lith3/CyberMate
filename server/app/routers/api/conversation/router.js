const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import topic-related actions
const { read } = require("../../../controllers/conversationActions");
const userIdCookie = require("../../../services/userIdcookie");

// Route to add a new topic
router.get("/:id", userIdCookie, read);

/* ************************************************************************* */

module.exports = router;
