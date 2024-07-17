const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import item-related actions
const { add, login } = require("../../../controllers/userActions");

// Route to add a new item
router.post("/", add);

router.post("/login", login);

/* ************************************************************************* */

module.exports = router;
