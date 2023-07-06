const express = require('express');
const router = express.Router();

const coursesController = require('../app/controllers/MeCoursesController.js');

router.get('/stored/courses', coursesController.storedCourses);
router.get('/trash/courses', coursesController.trashCourses);

module.exports = router;
