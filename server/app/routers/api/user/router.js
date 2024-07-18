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
} = require("../../../controllers/userActions");
const userIdCookie = require("../../../services/userIdcookie");
const upload = require("../../../services/upload");

// Route to add a new user
router.post("/", add);

router.put("/", userIdCookie, edit);

router.get("/profile", userIdCookie, read);

router.post("/login", login);

router.delete("/", userIdCookie, destroy);

router.put("/image", userIdCookie, upload.single("avatar"), editImage);

/* ************************************************************************* */

module.exports = router;
