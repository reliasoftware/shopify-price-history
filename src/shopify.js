require('isomorphic-fetch');
const { default: createShopifyAuth, verifyRequest } = require('@shopify/koa-shopify-auth');
const { default: graphQLProxy, ApiVersion } = require('@shopify/koa-shopify-graphql-proxy');
const session = require('koa-session');
const { SHOPIFY_API_KEY, SHOPIFY_API_SECRET_KEY } = require('./config').shopify;

function shopifyConfig(server) {
  server.keys = [SHOPIFY_API_SECRET_KEY];
  server.use(session(server)).use(
    createShopifyAuth({
      apiKey: SHOPIFY_API_KEY,
      secret: SHOPIFY_API_SECRET_KEY,
      scopes: ['read_products'],
      afterAuth(ctx) {
        ctx.redirect('/');
      },
    }),
  );

  server.use(graphQLProxy({ version: ApiVersion.July19 }));
  server.use(verifyRequest());
}

module.exports = shopifyConfig;
