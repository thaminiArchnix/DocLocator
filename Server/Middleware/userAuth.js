const jwt = require("jsonwebtoken");
const axios = require("axios");

//Protect User Access
const protect = async (req, res, next) => {
  try {
    // Extract the token from the Authorization header
    const token = req.headers.authorization.split(" ")[1];

    // Verify the token
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);

    // Check if the decoded token matches the request parameter ID
    if (decoded.id == req.params.id) {
      // Make a request to authenticate the user using the token
      const tokenData = { token };
      const authResponse = await axios.post(
        "http://localhost:3000/auth/authUser",
        tokenData
      );

      // Set the authenticated user's email in the request body
      res.body = { email: authResponse.data.email };

      // Move to the next middleware
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
