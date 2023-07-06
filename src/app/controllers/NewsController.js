const Course = require('../models/Course');

class NewsController {
  // [GET] /news
  async index(req, res, next) {
    Course.find({})
      .then((courses) => res.render('news'))
      .catch(next);

    // res.render('news');
  }

  // [GET] /news:slug
  show(req, res) {
    res.send('news detail');
  }
}

module.exports = new NewsController();
