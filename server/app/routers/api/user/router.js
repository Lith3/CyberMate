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
  editImage,
  disconect,
} = require("../../../controllers/userActions");
const userIdCookie = require("../../../services/userIdcookie");
const upload = require("../../../services/upload");
const {
  validateSignup,
  validateProfileEdit,
} = require("../../../services/validateUser");
const uniqueEmailandUsername = require("../../../services/uniqueUserAndEmail");

// Route to add a new user
router.post("/", validateSignup, uniqueEmailandUsername, add);

router.put(
  "/",
  userIdCookie,
  validateProfileEdit,
  uniqueEmailandUsername,
  edit
);

router.get("/profile", userIdCookie, read);

router.post("/login", login);

router.delete("/", userIdCookie, destroy);

router.put("/image", userIdCookie, upload.single("avatar"), editImage);

// Route to logout
router.post("/logout", disconect);

/* ************************************************************************* */

module.exports = router;
