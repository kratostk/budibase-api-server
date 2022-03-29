const AuthError = require("./AuthError");

function errorHandler(err, req, res, next) {
  if (err instanceof AuthError) {
    return res.status(err.code).json(err.message);
  }

  res.status(500).json("Something went wrong :(");
}

module.exports = errorHandler;
