const jwt = require("jsonwebtoken");

//Protect User Access
const protect = async (req, res, next) => {
  try {
    // Extract the token from the Authorization header
    const token = req.headers.authorization.split(" ")[1];

    // Verify the token
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);

    // Check if the decoded token matches the request parameter ID
    if (decoded.id == req.params.id) {
      //move to next middleware
      next();
    } else {
      // If the decoded token does not match the request parameter ID, return an error
      console.error("Error decoding access token!!!");
      res.status(401).json({ error: "Unauthorized" });
    }
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(401).json({ error: "Unauthorized" });
  }
};

module.exports = { protect };
