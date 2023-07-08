const User = require('../models/User');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

const Course = require('../models/Course');
const { multipleMongooseToObject } = require('../../util/mongoose');

class UserController {
  // [GET] /logout
  logout(req, res) {
    res.clearCookie('jwt');
    res.clearCookie('user');
    res.redirect('/auth/login');
  }
  // [GET] /login
  showLogin(req, res) {
    res.render('user/login', { layout: 'form' });
  }
  // [POST] /login
  async login(req, res, next) {
    // console.log(req.body);
    const { username, password } = req.body;

    try {
      if (!(username && password)) {
        return res.status(400).send('All input is required');
      }

      const user = await User.findOne({ username: username });
      if (user && (await bcrypt.compare(password, user.password))) {
        //create token
        const token = await jwt.sign(
          {
            user_id: user.id,
            username,
          },
          process.env.TOKEN_KEY,
          {
            expiresIn: '1h',
          },
        );
        //save token
        res.cookie('jwt', token, { httpOnly: true });
        res.cookie(
          'user',
          JSON.stringify({
            username,
            role: user.role ? user.role : null,
          }),
          { httpOnly: true },
        );

        // res.status(200).json(user);
        res.redirect(`/?user=${username}`);
      } else {
        res.status(400).send('Invalid credentials');
      }
    } catch (error) {
      console.log(error);
    }
  }
  // [GET] /register
  showRegister(req, res, next) {
    // res.json({hi: 'hehe'})
    res.render('user/register', { layout: 'form' });
  }

  // [POST] /register
  async register(req, res, next) {
    const { email, password, username } = req.body;

    if (!(email && username && password)) {
      res.status(400).send('All input is required');
    }

    var oldUser = await User.findOne({ email });
    if (oldUser) {
      return res.status(400).send('This email already exists');
    }
    oldUser = await User.findOne({ username });
    if (oldUser) {
      return res.status(400).send('This username already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const formData = {
      username: username,
      email: email,
      password: hashedPassword,
    };
    const user = new User(formData);

    // create token
    // const token = jwt.sign(
    //     {
    //         user_id: user._id,
    //         username,
    //     },
    //     process.env.TOKEN_KEY,
    //     {
    //         expiresIn: '7d',
    //     }
    // );
    // // save token
    // user.token = token;

    user
      .save()
      .then(() => res.redirect('/auth/login'))
      .catch(() => res.redirect('/auth/register'));

    // res.json(formData);
  }
}

module.exports = new UserController();
