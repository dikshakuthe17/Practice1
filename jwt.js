const jwt = require("jsonwebtoken");

const jwtAuthMiddleware = (req, res, next) => {

// first check if request headers contain the authorization header
const authorization = req.headers["authorization"];
  if (!authorization) {
    return res.status(401).json({ error: "Token not found" });
  }
  

  // extract the  jwt token from the request headers
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  // verify the jwt  token using the secret key
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the decoded user information to the request object
    req.user = decoded;
    next(); // Call the next middleware or route handler
  } catch (err) {
    console.error("JWT verification error:", err);
    // Handle token verification error
    return res.status(403).json({error: "Invalid token" });
  }
};


// function to genrate a jwt token
const generateToken = (userData) => {
  // Create a JWT token with user information and expiration time
  return jwt.sign( userData, process.env.JWT_SECRET,);
};



// function to verify a jwt token
const verifyToken = (token) => {
  // Verify the JWT token using the secret key
  return jwt.verify(token, process.env.JWT_SECRET);
};

module.exports = {
  jwtAuthMiddleware,
  generateToken,
  verifyToken,
};