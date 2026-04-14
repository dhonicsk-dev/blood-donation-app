const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // ✅ Check if header exists
    if (!authHeader) {
      return res.status(401).json({ message: "No token provided ❌" });
    }

    // ✅ Check format: Bearer token
    const parts = authHeader.split(" ");
    if (parts.length !== 2 || parts[0] !== "Bearer") {
      return res.status(401).json({ message: "Invalid token format ❌" });
    }

    const token = parts[1];

    // ✅ Verify token
    const decoded = jwt.verify(token, "mysecretkey");

    req.user = decoded;

    next();

  } catch (err) {
    console.error("Auth Error:", err.message);
    res.status(401).json({ message: "Unauthorized ❌" });
  }
};

function auth(req, res, next) {
  const token = req.headers.authorization;

  if (!token) return res.status(401).json({ error: "No token" });

  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
}