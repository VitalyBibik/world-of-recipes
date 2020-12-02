const { JWT_SECRET } = process.env;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/users');

module.exports.createUser = async (req, res, next) => {
  const {
    email, password, name
  } = req.body;
  try {
    const hash = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name, email, password: hash,
    });
    return res.status(201).send({
      name: newUser.name, email: newUser.email,
    });
  } catch (err) {
    return next(err);
  }
};

module.exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const userlogin = await User.findUserByCredentials(email, password);
    const token = jwt.sign({ _id: userlogin._id }, JWT_SECRET || 'dev-secret',
      { expiresIn: '7d' });

    res.cookie('jwt', token, {
      maxAge: 3600000 * 24 * 7,
      httpOnly: true,
      credentials: 'include',
    });
    return res.send({ token });
  } catch (err) {
    return next(err);
  }
};
module.exports.logout = async (req, res, next) => {
  try {
    res.cookie('jwt', '', {
      maxAge: 0,
      httpOnly: true,
    }).send({ message: 'Вы вышли из системы' });
  } catch (e) {
    return next();
  }
};
