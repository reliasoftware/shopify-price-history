require('isomorphic-fetch');
var rp = require('request-promise');
const { default: createShopifyAuth } = require('@shopify/koa-shopify-auth');
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
      scopes: ['read_products', 'write_products', 'read_themes', 'write_themes'],
      async afterAuth(ctx) {
        const { shop, accessToken } = ctx.session;
        ctx.cookies.set('shopOrigin', shop, { httpOnly: false });
        getThemeActive(shop, accessToken);
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
}
function getThemeActive(shop, token) {
  const URL = `https://${shop}/admin/api/2019-07`;

  var options = {
    uri: `${URL}/themes.json`,

    headers: {
      'X-Shopify-Access-Token': token,
    },
    json: true,
  };
  rp(options)
    .then(function(body) {
      const themeActive = body.themes.find(item => item.role === 'main');
      getProdutTemplateCode(shop, token, themeActive.id);
    })
    .catch(function(err) {
      console.info('err', err);
    });
}

function getProdutTemplateCode(shop, token, themeId) {
  const URL = `https://${shop}/admin/api/2019-07`;

  var options = {
    uri: `${URL}/themes/${themeId}/assets.json?asset[key]=snippets/product-price.liquid`,

    headers: {
      'X-Shopify-Access-Token': token,
    },
    json: true,
  };
  rp(options)
    .then(function(body) {
      editProdutTemplateCode(shop, token, themeId, body.asset.value);
    })
    .catch(function(err) {
      console.info('err', err);
    });
}
function editProdutTemplateCode(shop, token, themeId, code) {
  const URL = `https://${shop}/admin/api/2019-07`;
  const addReact = `
  <div id=react-app data-product-id={{product.id}} data-variant={{product.selected_or_first_available_variant.id}}></div><script type=text/javascript src=https://shopify-price-history.herokuapp.com/bundle-app.js></script>`;
  var options = {
    uri: `${URL}/themes/${themeId}/assets.json`,
    method: 'PUT',
    body: {
      asset: {
        key: 'snippets/product-price.liquid',
        value: code + addReact,
      },
    },
    headers: {
      'X-Shopify-Access-Token': token,
    },
    json: true,
  };
  rp(options)
    .then(function(body) {})
    .catch(function(err) {
      console.info('err', err);
    });
}
module.exports = shopifyConfig;
