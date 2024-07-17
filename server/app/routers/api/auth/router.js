const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import user-related actions
const { authActions } = require("../../../controllers/authActions");

router.get("/", authActions);

/* ************************************************************************* */

module.exports = router;
