const roleVerifyMiddleware = (requiredRole) => {
  return (req, res, next) => {
    if (!req.user || !req.user.role || req.user.role !== requiredRole) {
      return res.status(403).json({
        message: "You do not have permission to access this page",
      });
    }
    next();
  };
};

module.exports = roleVerifyMiddleware;
