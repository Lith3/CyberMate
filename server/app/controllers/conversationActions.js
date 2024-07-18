// Import access to database tables
const tables = require("../../database/tables");

// Add (Create) operation
const add = async (req, res, next) => {
  // Set date
  let date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Les mois commencent à 0, donc il faut ajouter 1
  const day = String(date.getDate()).padStart(2, "0");

  date = `${year}-${month}-${day}`;
  try {
    const conversation = await tables.message.create(
      req.user,
      date,
      req.body.newMessage,
      req.params.id
    );
    if (conversation === null || conversation === undefined) {
      res.sendStatus(400);
    } else {
      res.sendStatus(201);
    }
  } catch (err) {
    next(err);
  }
};

// Read operation

const read = async (req, res, next) => {
  try {
    const conversation = await tables.message.read(req.params.id);

    if (conversation === null || conversation === undefined) {
      res.status(404).json({ error: "Conversation not found" });
    } else {
      res.status(200).json(conversation);
    }
  } catch (err) {
    next(err);
  }
};

// Ready to export the controller functions
module.exports = { read, add };
