const tables = require("../../database/tables");

const uniqueEmailandUsername = async (req, res, next) => {
  const { email, username } = req.body;
  const id = req.user;
  const uniqueEmail = await tables.user.readFinder("email", email, id);
  const uniqueUsername = await tables.user.readFinder("username", username, id);

  if (uniqueEmail > 0) {
    return res.status(409).json({
      validationErrors: [{ message: "Cette adresse mail est déjà utilisée" }],
    });
  }
  if (uniqueUsername > 0) {
    return res.status(409).json({
      validationErrors: [{ message: "Ce pseudo est déjà utilisé" }],
    });
  }
  return next();
};

module.exports = uniqueEmailandUsername;
