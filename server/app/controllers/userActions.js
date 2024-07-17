const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Import access to database tables
const tables = require("../../database/tables");

// The R of BREAD - Read operation
const read = async (req, res, next) => {
  try {
    // Fetch a specific item from the database based on the provided ID
    const item = await tables.user.read(req.params.id);

    // If the item is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the item in JSON format
    if (item == null) {
      res.sendStatus(404);
    } else {
      res.json(item);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The E of BREAD - Edit (Update) operation
// This operation is not yet implemented

// The A of BREAD - Add (Create) operation
const add = async (req, res, next) => {
  // Extract the item data from the request body
  const user = req.body;

  try {
    // Set the number of rounds to generate the salt used in the hash
    const saltRounds = 10;

    const hashedPassword = await bcrypt.hash(user.password, saltRounds);

    // Replace plaintext password with hashed password
    user.password = hashedPassword;
    // Insert the item into the database
    // Insert the item into the database
    const insertId = await tables.user.create(user);

    delete req.body.password;

    // Generate JWT token
    const token = jwt.sign({ sub: insertId }, process.env.APP_SECRET, {
      expiresIn: "1d",
    });

    // Set the token in a cookie
    res.cookie("cybermateCookie", token, {
      httpOnly: true,
      sameSite: "Strict",
      maxAge: 24 * 60 * 60 * 1000,
    });
    // Respond with HTTP 201 (Created) and the ID of the newly inserted item
    res.status(201).json();
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await tables.user.login(email);
    // Check that the user exists and that the password is correct
    if (
      user !== null &&
      user !== undefined &&
      (await bcrypt.compare(password, user.password)) === true
    ) {
      // Remove password from request body
      delete req.body.password;

      // Generate JWT token
      const token = jwt.sign({ sub: user.id }, process.env.APP_SECRET, {
        expiresIn: "1d",
      });

      // Set the token in a cookie
      res.cookie("cybermateCookie", token, {
        httpOnly: true,
        sameSite: "Strict",
        maxAge: 24 * 60 * 60 * 1000,
      });
      res.status(200).json();
    } else {
      res.status(401).json({ error: "unauthorized access" });
    }
  } catch (err) {
    next(err);
  }
};
// The D of BREAD - Destroy (Delete) operation
// This operation is not yet implemented

// Ready to export the controller functions
module.exports = {
  read,
  // edit,
  add,
  login,
  // destroy,
};
