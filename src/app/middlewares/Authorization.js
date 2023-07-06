
module.exports = function requireRole(role) {
    return (req, res, next) => {
      const { user } = req;
  
      if (user && user.role === role) {
        next(); // User has the required role, proceed to the next middleware or route handler
      } else {
        res.status(403).json({ message: 'Access denied' }); // User does not have the required role
      }
    };
  }