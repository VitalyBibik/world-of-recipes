const routes = require('express').Router();

const NotValidUrl = require('../controllers/NotValidUrl');
const userRoutes = require('./users');
const articleRoutes = require('./article');
const authRoutes = require('./auth');

routes.use(userRoutes);
routes.use(articleRoutes);
routes.use(authRoutes);
routes.use('*', NotValidUrl);

module.exports = routes;
