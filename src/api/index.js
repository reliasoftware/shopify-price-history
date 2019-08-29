const fs = require('fs');
const path = require('path');
const Router = require('koa-router');
const jwt = require('koa-jwt');

const { apiVersion } = require('../config').server;
const { secret } = require('../config').jwt;
const baseName = path.basename(__filename);

function applyApiMiddleware(app) {
  const router = new Router({
    prefix: `/api/${apiVersion}`,
  });

  // Require all the folders and create a sub-router for each feature api
  fs.readdirSync(__dirname)
    .filter(file => file.indexOf('.') !== 0 && file !== baseName)
    .forEach(file => {
      const api = require(path.join(__dirname, file))(Router);
      router.use(api.routes());
    });
  app.use(jwt({ secret }).unless({ path: [/\/auth/, /\/product/] }));
  app.use(router.routes()).use(router.allowedMethods());
}

module.exports = applyApiMiddleware;
