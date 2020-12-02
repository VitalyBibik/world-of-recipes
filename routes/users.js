const routes = require('express').Router();
const { Joi, celebrate } = require('celebrate');

const auth = require('../middleware/auth');

const { getUser } = require('../controllers/users');

routes.get('/users/me', celebrate({
  params: Joi.object().keys({
    id: Joi.string().alphanum().length(24),
  }),
}), auth, getUser);
module.exports = routes;
