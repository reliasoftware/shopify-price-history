'use strict';

const controller = require('./auth.controller');

module.exports = Router => {
  const router = new Router({
    prefix: `/auth`,
  });

  router.post('/', controller.login);
  return router;
};
