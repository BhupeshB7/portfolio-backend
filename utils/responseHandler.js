const successResponse = (res, statusCode, data, message) => {
    res.status(statusCode).json({ success: true, message, data });
  };
  
  const errorResponse = (res, statusCode, error, message) => {
    res.status(statusCode).json({ success: false, message, error });
  };
  
  const validationErrorResponse = (res, errors) => {
    res.status(400).json({ success: false, message: 'Validation errors', errors });
  };
  
  module.exports = {
    successResponse,
    errorResponse,
    validationErrorResponse,
  };
  