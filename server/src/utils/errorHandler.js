const winston = require("winston");

const logger = winston.createLogger({
  level: "error",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: "error.log" }),
    new winston.transports.Console(),
  ],
});

const errorHandler = (err, req, res, next) => {
  // File: utils/errorHandler.js
  const winston = require("winston");

  const logger = winston.createLogger({
    level: "error",
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.json()
    ),
    transports: [
      new winston.transports.File({ filename: "error.log" }),
      new winston.transports.Console(),
    ],
  });

  const errorHandler = (err, req, res, next) => {
    // Log error details
    logger.error({
      message: err.message,
      stack: err.stack,
      method: req.method,
      url: req.url,
      ip: req.ip,
    });

    // Handle specific error types
    if (err.name === "ValidationError") {
      // express-validator errors
      return res.status(422).json({ errors: err.errors });
    }

    if (err.name === "JsonWebTokenError" || err.name === "TokenExpiredError") {
      // JWT errors from adminAuthMiddleware
      return res.status(401).json({ error: "Invalid token" });
    }

    if (err.name === "MulterError") {
      // Multer file upload errors
      return res
        .status(400)
        .json({ error: `File upload error: ${err.message}` });
    }

    if (err.name === "MongoError" && err.code === 11000) {
      // MongoDB duplicate key error
      const field = Object.keys(err.keyValue)[0];
      return res.status(400).json({ error: `Duplicate key: ${field}` });
    }

    // Custom error messages from controllers/use cases
    if (err.message.includes("not found")) {
      return res.status(404).json({ error: err.message });
    }

    if (err.message.includes("Invalid credentials")) {
      return res.status(401).json({ error: err.message });
    }

    if (err.message.includes("Access denied")) {
      return res.status(403).json({ error: err.message });
    }

    if (err.message.includes("Invalid") || err.message.includes("Failed to")) {
      return res.status(400).json({ error: err.message });
    }

    // Generic server error
    res.status(500).json({ error: "Internal server error" });
  };

  module.exports = errorHandler;
  logger.error({
    message: err.message,
    stack: err.stack,
    method: req.method,
    url: req.url,
    ip: req.ip,
  });

  // Handle specific error types
  if (err.name === "ValidationError") {
    return res.status(422).json({ errors: err.errors });
  }

  if (err.name === "JsonWebTokenError" || err.name === "TokenExpiredError") {
    return res.status(401).json({ error: "Invalid token" });
  }

  if (err.name === "MulterError") {
    return res.status(400).json({ error: `File upload error: ${err.message}` });
  }

  if (err.name === "MongoError" && err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    return res.status(400).json({ error: `Duplicate key: ${field}` });
  }

  if (err.message.includes("not found")) {
    return res.status(404).json({ error: err.message });
  }

  if (err.message.includes("Invalid credentials")) {
    return res.status(401).json({ error: err.message });
  }

  if (err.message.includes("Access denied")) {
    return res.status(403).json({ error: err.message });
  }

  if (err.message.includes("Invalid") || err.message.includes("Failed to")) {
    return res.status(400).json({ error: err.message });
  }

  res.status(500).json({ error: "Internal server error" });
};

module.exports = errorHandler;
