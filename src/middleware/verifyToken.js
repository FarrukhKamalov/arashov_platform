const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token;
  if (authHeader) {
    jwt.verify(authHeader, process.env.SECRET, (err, user) => {
      console.log(user)
      if (err) res.status(403).json("Token is not valid!");
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json("You are not authenticated!");
  }
};


const verifyTokenAndAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
      if (req.user.id === req.params.id) {
        next();
      } else {
        res.status(403).json("You are not alowed to do that!");
      }
    });
  };


  module.exports = {
    verifyToken, 
    verifyTokenAndAuthorization
  }