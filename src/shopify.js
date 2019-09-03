require('isomorphic-fetch');
const { default: createShopifyAuth, verifyRequest } = require('@shopify/koa-shopify-auth');
const { default: graphQLProxy, ApiVersion } = require('@shopify/koa-shopify-graphql-proxy');
const { registerWebhook } = require('@shopify/koa-shopify-webhooks');
const session = require('koa-session');
const { SHOPIFY_API_KEY, SHOPIFY_API_SECRET_KEY } = require('./config').shopify;
const { HOST } = require('./config').server;

console.info('HOST', `${HOST}/api/v1/product/webhooks/update`);
function shopifyConfig(server) {
  server.keys = [SHOPIFY_API_SECRET_KEY];
  server.use(session(server)).use(
    createShopifyAuth({
      apiKey: SHOPIFY_API_KEY,
      secret: SHOPIFY_API_SECRET_KEY,
      scopes: ['read_products', 'write_products'],
      async afterAuth(ctx) {
        const { shop, accessToken } = ctx.session;
        const registration = await registerWebhook({
          address: `${HOST}/api/v1/product/webhooks/update`,
          topic: 'PRODUCTS_CREATE',
          accessToken,
          shop,
        });
        await registerWebhook({
          address: `${HOST}/api/v1/product/webhooks/update`,
          topic: 'PRODUCTS_UPDATE',
          accessToken,
          shop,
        });

        if (registration.success) {
          console.log('Successfully registered webhook!');
        } else {
          console.log('Failed to register webhook', JSON.stringify(registration.result));
        }
        ctx.redirect('/');
      },
    }),
  );

  server.use(graphQLProxy({ version: ApiVersion.July19 }));
  //server.use(verifyRequest()).unless({ path: [/\/webhooks\/update/] });
}

module.exports = shopifyConfig;
