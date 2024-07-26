const Koa = require('koa');
const app = new Koa();
const bookController = require('./controllers/book');
const genreController = require('./controllers/genre');
const authorController = require('./controllers/author');

app.use(async ctx => {
  //Code here
});

module.exports = app; //need for testing