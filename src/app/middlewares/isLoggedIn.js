const jwt = require('jsonwebtoken');

module.exports = function isLoggedIn(req, res, next) {
  const token = req.cookies.jwt;

  if (!token) {
    return next();
  }

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    const username = decoded.username;
    return res.redirect(`/?user=${username}`);
  } catch (error) {
    res.clearCookie('jwt');
    return next();
  }
};
