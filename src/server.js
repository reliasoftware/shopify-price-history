const Koa = require('koa');
const bodyParser = require('koa-bodyparser')();
const compress = require('koa-compress')();
const cors = require('@koa/cors')(/* Add your cors option */);
const helmet = require('koa-helmet')(/* Add your security option */);
const logger = require('koa-logger')();
const bugsnag = require('@bugsnag/js');
const serve = require('koa-static');
const bugsnagKoa = require('@bugsnag/plugin-koa');
const bugsnagClient = bugsnag('24e759545b77bdd159d384c9d21e4e1a');

const errorHandler = require('./middleware/error.middleware');
const applyApiMiddleware = require('./api');
const { isDevelopment } = require('./config');
const shopifyConfig = require('./shopify');

bugsnagClient.use(bugsnagKoa);
const middleware = bugsnagClient.getPlugin('koa');
const server = new Koa();

if (isDevelopment) {
  server.use(logger);
}

server.use(serve('./app/dist'));
server.use(serve('./frontend/dist'));

shopifyConfig(server);

server
  .use(middleware.requestHandler)
  .use(errorHandler)
  .use(helmet)
  .use(compress)
  .use(cors)
  .use(bodyParser);

/**
 * Apply to our server the api router
 */
applyApiMiddleware(server);

module.exports = server;
