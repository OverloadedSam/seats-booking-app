/**
 * @DESC  Error response class so that I can pass ErrorResponse object to next().
 */
class ErrorResponse extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
  }
}

module.exports = ErrorResponse;
