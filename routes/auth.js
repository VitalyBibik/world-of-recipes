const routes = require('express').Router();
const { Joi, celebrate } = require('celebrate');
const { createUser, login, logout } = require('../controllers/auth');

routes.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().required().min(2).max(30),
  }),
}), createUser);
routes.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), login);

routes.post('/logout', logout);

module.exports = routes;
