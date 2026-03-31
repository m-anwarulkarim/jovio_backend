import type { ErrorRequestHandler } from "express";

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";

  const stackLines = err.stack ? err.stack.split("\n") : [];
  const originLine =
    stackLines.length > 1 ? stackLines[1].trim() : "Unknown position";

  res.status(statusCode).json({
    success: false,
    message: message,
    ...(process.env.NODE_ENV === "development" && {
      errorSource: originLine,
      stack: err.stack,
    }),
  });
};

export default globalErrorHandler;
