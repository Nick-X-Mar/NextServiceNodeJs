// errorMiddleware.js

// Middleware for handling errors in Express

class ErrorHandler extends Error {
  constructor(statusCode, message) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

const handleError = (err, res) => {
  const { statusCode, message } = err;
  res.status(statusCode || 500).json({ error: message || 'Internal Server Error' });
};

const handleBadRequest = (res, message = 'Bad Request') => {
  throw new ErrorHandler(400, message);
};

const handleUnauthorized = (res, message = 'Unauthorized') => {
  throw new ErrorHandler(401, message);
};

const handleForbidden = (res, message = 'Forbidden') => {
  throw new ErrorHandler(403, message);
};

const handleNotFound = (res, message = 'Not Found') => {
  throw new ErrorHandler(404, message);
};

export {
  ErrorHandler,
  handleError,
  handleBadRequest,
  handleUnauthorized,
  handleForbidden,
  handleNotFound
};
