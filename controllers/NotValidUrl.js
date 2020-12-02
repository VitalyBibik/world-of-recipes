const NotFoundError = require('../errors/NotFoundError');
const { msgNotFound } = require('../constants/constant');

module.exports = (req, res, next) => {
  try {
    throw new NotFoundError(msgNotFound);
  } catch (error) {
    next(error);
  }
};
