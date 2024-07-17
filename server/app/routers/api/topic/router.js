const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import topic-related actions
const { browse, add } = require("../../../controllers/topicActions");
const userIdCookie = require("../../../services/userIdcookie");

// Route to add a new topic
router.get("/", browse);
router.post("/", userIdCookie, add);

/* ************************************************************************* */

module.exports = router;
