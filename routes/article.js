const routes = require('express').Router();
const { Joi, celebrate } = require('celebrate');
const auth = require('../middleware/auth');
const { validatorURL } = require('../validation/validatorLink');
const {
  getArticle, deleteArticle, createArticle,
} = require('../controllers/article');

routes.get('/articles', auth, getArticle);
routes.post('/articles', celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required(),
    title: Joi.string().required(),
    text: Joi.string().required(),
    date: Joi.string().required(),
    source: Joi.string().required(),
    link: Joi.string().required().custom(validatorURL),
    image: Joi.string().required().custom(validatorURL),
  }),
}), auth, createArticle);
routes.delete('/articles/:articleId', celebrate({
  body: Joi.object().keys({
    articleId: Joi.string().alphanum().length(24),
  }),
}), auth, deleteArticle);

module.exports = routes;
