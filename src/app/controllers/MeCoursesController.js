const Course = require('../models/Course');
const { multipleMongooseToObject } = require('../../util/mongoose');

class CoursesController {
  
  // [GET] /me/stored/courses
  storedCourses(req, res, next) {
    let courseQuery = Course.find();

    if (req.query.hasOwnProperty('_sort')){
      courseQuery = courseQuery.sort({
        [req.query.column]: req.query.type,
      });
    }
    // promise xu ly bat dong bo
    Promise.all([courseQuery, Course.countDocumentsDeleted()])
      .then(([courses, deletedCount]) => {
        res.render('courses/me/stored-courses', {
          deletedCount,
          courses: multipleMongooseToObject(courses),
        });
      })
      .catch(next);

    // Course.countDocumentDeleted()
    //   .then((deletedCount) => {
    //     console.log(deletedCount);
    //   })
    //   .catch(() => { })
    // Course.find({})
    //   .then((courses) => res.render('courses/me/stored-courses', {
    //     courses: multipleMongooseToObject(courses),
    //   }))
    //   .catch(next)
  }

  // [GET] /me/trash/courses
  trashCourses(req, res, next) {
    Course.findDeleted()
      .then((courses) =>
        res.render('courses/me/trash-courses', {
          courses: multipleMongooseToObject(courses),
        }),
      )
      .catch(next);
  }
}

module.exports = new CoursesController();
