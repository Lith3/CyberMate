const jwt = require("jsonwebtoken");

const userIdCookie = (req, res, next) => {
  const token = req.cookies.cybermateCookie;
  try {
    if (token === undefined || token === null) {
      res.status(401).json({ error: "Invalid token" });
    } else {
      const decoded = jwt.verify(token, process.env.APP_SECRET);
      const userId = decoded.sub;
      req.user = userId;
      next();
    }
  } catch (err) {
    next(err);
  }
};

module.exports = userIdCookie;
