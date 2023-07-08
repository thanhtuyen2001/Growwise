const authRoute = require('./auth');
const newsRouter = require('./news');
const siteRouter = require('./site');
const coursesRouter = require('./courses');
const meCourses = require('./meCourses');

const authMiddleware = require('../app/middlewares/Authen');
const requireRole = require('../app/middlewares/Authorization');

function route(app) {
  app.use('/auth', authRoute);
  app.use('/news', newsRouter);
  app.use('/courses', authMiddleware, coursesRouter);
  app.use('/dashboard', authMiddleware, requireRole, meCourses);
  app.use('/', siteRouter);
}

module.exports = route;
