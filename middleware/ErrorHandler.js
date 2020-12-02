const { msgIdNotFound } = require('../constants/constant');
const { msgDuplicateEmail } = require('../constants/constant');

function ErrorHandler(error, req, res, next) {
  let { statusCode = 500, message } = error;

  if ((error.name === 'ValidationError') || (error.joi !== undefined && error.joi.toString().includes('ValidationError'))) {
    statusCode = 400;
  }
  if (error.name === 'CastError') {
    statusCode = 400;
    message = msgIdNotFound;
  }
  if (error.code === 11000) {
    statusCode = 409;
    message = msgDuplicateEmail;
  }
  res.status(statusCode).send({
    message: statusCode === 500 ? 'Произошла ошибка' : message,
  });
  next();
}
module.exports = ErrorHandler;
