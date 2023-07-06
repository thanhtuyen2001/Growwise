const authRoute = require('./auth');
const newsRouter = require('./news');
const siteRouter = require('./site');
const coursesRouter = require('./courses');
const meCourses = require('./meCourses');

const authMiddleware = require('../app/middlewares/auth');
const isLoggedIn = require('../app/middlewares/isLoggedIn');

function route(app) {
  app.use('/auth', authRoute);
  app.use('/news', newsRouter);
  app.use('/courses',authMiddleware, coursesRouter);
  app.use('/me', authMiddleware, meCourses);
  app.use('/',  siteRouter);

  app.post('/search', (req, res) => {
    console.log(req.body);
    res.send('Hello there :>');
  });
}

module.exports = route;
