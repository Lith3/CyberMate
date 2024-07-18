const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import user-related actions
const {
  add,
  read,
  login,
  edit,
  destroy,
} = require("../../../controllers/userActions");
const userIdCookie = require("../../../services/userIdcookie");

// Route to add a new user
router.post("/", add);

router.put("/", userIdCookie, edit);

router.get("/profile", userIdCookie, read);

router.post("/login", login);

router.delete("/", userIdCookie, destroy);

/* ************************************************************************* */

module.exports = router;
