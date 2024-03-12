const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  console.log(token);
  if (token == null) return res.status(401).json({ error: "No access token" });

  jwt.verify(token, process.env.JWT_SECRET, (err, doctor) => {
    if (err) return res.status(403).json({ error: "Invalid Token" });
    req.doctor = doctor;
    next();
  });
};

module.exports = authenticateToken;
