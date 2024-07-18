// Import access to database tables
const tables = require("../../database/tables");

// Add (Create) operation
// const add = async (req, res, next) => {
//   // Extract the conversation data from the request body

// };

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
module.exports = { read };
