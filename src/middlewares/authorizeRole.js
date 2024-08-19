const createError = require("http-errors");

// Middleware untuk memeriksa role pengguna
const authorizeRole = (roles) => (req, res, next) => {
  try {
    if (!req.decoded || !roles.includes(req.decoded.role)) {
      return next(new createError(403, "Access denied"));
    }
    next();
  } catch (error) {
    console.log(error);
    next(new createError(500, "Internal server error"));
  }
};

module.exports = {
  authorizeRole,
};
