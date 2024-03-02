export interface IError extends Error {
  statusCode: number
errText: string
}

class NotFoundError extends Error {
  statusCode: number;

  // errText: string;

  constructor(message: string) {
    super(message);
    this.statusCode = 404;
    // this.message = message;
  }
}

module.exports = NotFoundError;
