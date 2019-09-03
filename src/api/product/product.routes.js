'use strict';
const { receiveWebhook } = require('@shopify/koa-shopify-webhooks');
const controller = require('./product.controller');
const { SHOPIFY_API_SECRET_KEY } = require('../../config').shopify;
const webhook = receiveWebhook({ secret: SHOPIFY_API_SECRET_KEY });
console.info('SHOPIFY_API_SECRET_KEY', SHOPIFY_API_SECRET_KEY);
module.exports = Router => {
  const router = new Router({
    prefix: `/product`,
  });

  router.get('/:productId', controller.getProduct).post('/webhooks/update', controller.callbacks);
  return router;
};
