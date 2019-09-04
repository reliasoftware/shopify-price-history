const fs = require('fs');
const path = require('path');
const Router = require('koa-router');
const { verifyRequest } = require('@shopify/koa-shopify-auth');
const { apiVersion } = require('../config').server;
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
  app.use(router.routes()).use(router.allowedMethods());
  app.use(verifyRequest());
}

module.exports = applyApiMiddleware;
