const jwt = require("jsonwebtoken");
const verifyToken = (req, res, next) => {
  //check if the headers has token
  const token = req.headers["authorization"];
  if (!token) return res.status(403).send("Token required for authentication");
  try {
    //split the token
    //Bearer token
    const realJwt = token.split(" ")[1];
    const decodedToken = jwt.verify(realJwt, process.env.JWT_SECRET);
    //add it the req instance object
    req.user = decodedToken;
  } catch (error) {
    return res.status(401).send("Invalid Token");
  }
  //if every thing goes well move it to the next middleware
  return next();
};

module.exports = verifyToken;
