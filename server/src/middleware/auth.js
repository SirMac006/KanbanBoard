"use strict";

const jwt = require("jsonwebtoken");

// Load environment variables
require("dotenv").config();
const jwtSecret = process.env.JWT_SECRET;

// Middleware to authenticate token
const authenticateToken = (req, res, next) => {
  // Get the token from the request header
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Access Denied: No Token Provided" });
  }

  // Verify the token
  jwt.verify(token, jwtSecret, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid Token" });
    }

    // Attach the user to the request object
    req.user = user;
    next();
  });
};

// Export the middleware
module.exports = { authenticateToken };
