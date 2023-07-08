const jwt = require('jsonwebtoken');

module.exports = function verifyToken(req, res, next) {
  // console.log( req.headers);
  const token = req.cookies.jwt;
  if (!token) {
    return res.redirect('/auth/login');
  }
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    // console.log({decoded});
  } catch (error) {
    res.clearCookie('jwt');
    res.clearCookie('user');
    return res.status(401).send('Token expired!');
  }

  next();
};
