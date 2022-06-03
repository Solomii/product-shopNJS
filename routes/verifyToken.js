const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token;

  if (authHeader) {
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json("Tiken is not valid!")
      };

      res.user = user;
      next()
    })
  } else {
    return res.status(401).json("You are not authenticated!")
  }
}

module.exports = {
   verifyToken
};