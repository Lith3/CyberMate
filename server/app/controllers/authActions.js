const authActions = async (req, res) => {
  const token = req.cookies.cybermateCookie;

  try {
    if (token === undefined) {
      return res.status(403).json({ error: "Invalid token" });
    }
    return res.status(200).json();
  } catch (err) {
    console.error("Token verification error:", err);
    return res.status(403).json({ error: "Invalid token" });
  }
};

module.exports = { authActions };
