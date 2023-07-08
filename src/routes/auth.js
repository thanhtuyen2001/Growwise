const express = require('express');
const router = express.Router();

const UserController = require('../app/controllers/UserController');
const isLoggedIn = require('../app/middlewares/isLoggedIn');

router.get('/register', isLoggedIn, UserController.showRegister);
router.post('/register', UserController.register);
router.get('/login', isLoggedIn, UserController.showLogin);
router.post('/login', UserController.login);
router.get('/logout', UserController.logout);

module.exports = router;
