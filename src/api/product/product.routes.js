'use strict';

const controller = require('./product.controller');

module.exports = Router => {
  const router = new Router({
    prefix: `/product`,
  });

  router.get('/:productId', controller.getProduct).post('/callbacks', controller.callbacks);
  return router;
};
