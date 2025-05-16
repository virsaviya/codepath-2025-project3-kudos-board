class ValidationError extends Error {
  constructor(resource) {
    super(`${resource} is missing or invalid.`);
    this.name = 'ValidationError';
    this.statusCode = 400;
  }
}

class NotFoundError extends Error {
  constructor(resource, id) {
    super(`Resource not found: ${resource} with ID ${id}`);
    this.name = 'NotFoundError';
    this.resource = resource;
    this.id = id;
    this.statusCode = 404;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = {
  ValidationError,
  NotFoundError,
};
