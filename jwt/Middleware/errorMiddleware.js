const errorMiddleware = (err, req, res, next) => {
  const status = err.status || err.statusCode || 500;
  const message = err.message || "Something went wrong";

  console.error("ERROR OCCURRED");
  console.error("Message:", message);
  console.error("Status:", status);

  // Show stack only in development
  res.status(status).json({
    success: false,
    message: message
  });
};

module.exports = errorMiddleware;
