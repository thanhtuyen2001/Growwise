module.exports = function requireRole(req, res, next) {
  let user = {};

  if (req.cookies.user) {
    const { username, role } = JSON.parse(req.cookies.user);
    user.role = role;
    user.name = username;
  }

  if (user.role === 'admin') {
    res.locals.username = user.name;
    next();
  } else {
    return res.redirect('/');
  }
};
