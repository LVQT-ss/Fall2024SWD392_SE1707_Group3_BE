// src/utils/error.js
export const errorHandler = (res, error, message = 'Server error', statusCode = 500) => {
    console.error(message, error);
    res.status(statusCode).json({ message, error: error.message });
  };
  