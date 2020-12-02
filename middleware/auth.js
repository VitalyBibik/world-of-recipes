const jwt = require('jsonwebtoken');
const NeedAuthError = require('../errors/NeedAuthError');
const { msgNeedAuth } = require('../constants/constant');
const { JWT_KEYS } = require('../config');

module.exports = (req, res, next) => {
  if (!req.cookies.jwt) {
    throw new NeedAuthError(msgNeedAuth);
  }
  const token = req.cookies.jwt;
  let payload;
  try {
    payload = jwt.verify(token, JWT_KEYS);
  } catch (error) {
    throw new NeedAuthError(msgNeedAuth);
  }
  req.user = payload;
  return next();
};
