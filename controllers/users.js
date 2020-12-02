const User = require('../models/users');
const NotFoundError = require('../errors/NotFoundError');
const { msgUserNotFound } = require('../constants/constant');

module.exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id)
      .orFail(() => new NotFoundError(msgUserNotFound));
    return res.send(user);
  } catch (err) {
    return next(err);
  }
};
