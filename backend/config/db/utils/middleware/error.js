const ErrorHandler = require("../utils/ErrorHandler");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal sever";

  //mongodb id error
  if (err.name === "castError") {
    const message = `Resources not found with this id.. Invalid ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  // Duplicate key error
  if (err.code === 11000) {
    const message = "Duplicate key ${object.keys(err.keyValue)} Entered";
    err = new ErrorHandler(message, 400);
  }

  // wrong jwt error
  if (err.name === "jsonWebTokenError") {
    const message = "your url is invalid pls try again later";
    err = new ErrorHandler(message, 400);
  }

  // jwt expired
  if (err.name === "TokenExpiredError") {
    const message = "your url is expired pls try again later";
    err = new ErrorHandler(message, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
