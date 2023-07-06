const Course = require('../models/Course');
const { multipleMongooseToObject } = require('../../util/mongoose');

class SiteController {
  // [GET] /
  index(req, res, next) {
    // console.log(req.query)
    
    var username = null;
    if(req.query.user){
       username = req.query.user;
    }
    Course.find({})
      .then((courses) => {
        res.render('home', {
          courses: multipleMongooseToObject(courses),
          username
        });
      })
      .catch(next);
  }

  // [GET] /search
  search(req, res) {
    res.render('search');
  }

  // [GET] /contact
}

module.exports = new SiteController();
