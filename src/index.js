require('dotenv').config();
const express = require('express');
const hbs = require('express-handlebars');
const path = require('path');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');

const sortMiddleware = require('./app/middlewares/sortMiddleware.js');

const app = express(); // express la 1 ham tra ve 1 instant
const port = 3000;
const routes = require('./routes');
const db = require('./config/db');

// connect to db
db.connect();

// khi gap path trong url, app phai ktra file tinh (static)
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  express.urlencoded({
    extended: true,
  }),
); // middleware xu li file tu form
app.use(express.json()); // middleware xu li dl tu code js len: e.g. fetch, axios, XMLHttpRequest, ajax,...
app.use(cookieParser());

app.use(methodOverride('_method')); // middleware help override method in html form tag
// template engine
app.engine(
  'handlebars',
  hbs.engine({
    extname: 'handlebars',
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, '/resources/views/layouts/'),
    partialsDir: [path.join(__dirname, '/resources/views/partials/')],
    helpers: {
      sum: (a, b) => a + b,
      sortable: (field, sort) => {
        const sortType = field === sort.column ? sort.type : 'default';

        const icons = {
          default: 'chevron-expand-outline',
          asc: 'chevron-down-outline',
          desc: 'chevron-up-outline',
        };
        const types = {
          default: 'asc',
          desc: 'asc',
          asc: 'desc',
        };

        const type = types[sortType];
        const icon = icons[sortType];
        return `<a href="?_sort&column=${field}&type=${type}"><ion-icon name="${icon}"></ion-icon></a>`;
      },
      loginBtn: (username) => {
        if (username) {
          global.username = username;
          return `<div class="dropdown">

          <a class="btn btn-secondary dropdown-toggle " href="/auth/logout" type="button" id="dropdownMenuButton"
            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <img src="/img/userAvatar.png" alt="avatar" class="rounded-circle  img-thumbnail" style="object-fit: contain; width: 30px; height: auto">

            ${username}
          </a>
          <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <a class="dropdown-item" href="/auth/logout">Logout</a>
          </div>
        </div>`;
        } else {
          return `<a class="btn btn-secondary " href="/auth/login" type="button" >
          Log in
        </a>
        <a class="btn btn-secondary " href="/auth/register" type="button" >
          Sing up
        </a>
          `;
        }
      },
     
    },
  }),
);
app.set('view engine', 'handlebars');
// console.log(__dirname);
app.set('views', path.join(__dirname, 'resources', 'views'));
// hbs.registerPartials(__dirname + '/resources/views', function (err) {});

app.use(sortMiddleware);

// route init
routes(app);

// 127.0.0.1 -- localhost
app.listen(port, () => {
  console.log(` app listening at http://localhost:${port}`);
});
