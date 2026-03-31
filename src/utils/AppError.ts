export default class AppError extends Error {
  statusCode: number;
  code: string;
  details: unknown;

  constructor(
    statusCode: number,
    message: string,
    code = "APP_ERROR",
    details: unknown = null,
  ) {
    super(message);

    this.name = "AppError";
    this.statusCode = statusCode;
    this.code = code;
    this.details = details;

    Error.captureStackTrace(this, this.constructor);
  }
}
