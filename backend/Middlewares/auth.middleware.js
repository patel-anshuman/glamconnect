const jwt = require('jsonwebtoken');
require('dotenv').config();
const BlacklistModel = require('../Model/blacklist.model');

const auth = async (req, res, next) => {
  let token = req.headers.authorization;
  // console.log(token)

  if (!token) {
    return res.status(401).json({ success: false, msg: "Authorization token missing" });
  }

  // Extract the token value from the "Authorization" header (e.g., "Bearer <token>")
  token = token.split(" ")[1];
  if (token) {
    try {
      // Check if the token is blacklisted
      const isTokenBlacklisted = await BlacklistModel.exists({ token });
      if (isTokenBlacklisted) {
        return res.status(401).send({ msg: "Token is blacklisted. Authentication failed." });
      }
      
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
      // console.log(decodedToken);
      if (decodedToken) {
        req.body.userID = decodedToken.userID;
        req.body.role = decodedToken.role;
        next();     // To next middleware or route
      } else {
        res.status(400).json({ msg: "Invalid Token !!" });
      }
    } catch (error) {
      // Handle token verification errors
      res.status(400).json({ msg: "Invalid Token !!" });
    }
  } else {
    res.status(400).json({ msg: "Authentication failed" });
  }
};

module.exports = { auth };