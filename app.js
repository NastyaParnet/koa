const Koa = require('koa');
const app = new Koa();
const bookController = require('./controllers/book');
const genreController = require('./controllers/genre');
const authorController = require('./controllers/author');

const routes = {
  '/book': bookController,
  '/genre': genreController,
  '/author': authorController,
  'error' : () => ({ msg: 'Route is not supported'}),
}

const mwRouter = async (ctx, next) => {
  ctx.state.func = routes[ctx.path] || routes['error'];
  ctx.state.params = ctx.request.query;
  await next();
}

app.use(mwRouter);
app.use(async ctx => {
  ctx.body = await ctx.state.func(ctx.state.params);
});

module.exports = app;