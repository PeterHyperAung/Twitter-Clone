const jwt = require("jsonwebtoken");
const secret = "A super duper huge secret!";

module.exports = function (req, res, next) {
  const authHeader = req.headers["authorization"];
  let token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(400).json({ msg: "token missing" });
  token = token.slice(1, -1);

  jwt.verify(token, secret, (err, user) => {
    if (err) res.status(403).json({ msg: "invalid token" });
    res.locals.user = user;
  });

  next();
};
