// Import access to database tables
const tables = require("../../database/tables");

// The A of BREAD - Add (Create) operation
const add = async (req, res, next) => {
  // Extract the topic data from the request body
  let { subject } = req.body;
  const userId = req.user;
  subject = `${subject.slice(0, 245)}...`;
  let date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Les mois commencent à 0, donc il faut ajouter 1
  const day = String(date.getDate()).padStart(2, "0");

  date = `${year}-${month}-${day}`;
  try {
    // Insert the item into the database
    const insertId = await tables.topic.create(
      req.body.title,
      subject,
      date,
      userId
    );
    // Respond with HTTP 201 (Created) and the ID of the newly inserted topic
    res.status(201).json({ insertId });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The D of BREAD - Destroy (Delete) operation
// This operation is not yet implemented

// Ready to export the controller functions
module.exports = {
  add,
};
