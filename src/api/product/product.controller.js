const { Product, Price } = require('../../models');
const { groupBy } = require('../../utils');

exports.callbacks = async ctx => {
  const {
    body: { variants = [], id },
  } = ctx.request;
  const product = await Product.findOne({
    where: {
      id,
    },
  });
  if (!product) {
    Product.create({ id });
  }
  variants.map(async variant => {
    const { id, product_id: ProductId, price, created_at: createdAt, updated_at: updatedAt } = variant;
    const priceFound = await Price.findOne({
      where: {
        id,
      },
      order: [['updatedAt', 'DESC']],
    });
    if (!priceFound || (priceFound && Number(priceFound.price) !== Number(price))) {
      Price.create({ id, ProductId, price, createdAt, updatedAt });
    }
  });

  ctx.body = { success: true };
};

exports.getProduct = async ctx => {
  const { productId } = ctx.params;
  const product = await Product.findOne({
    where: { id: productId },
    attributes: ['id', 'isShow'],
  });

  ctx.body = { success: true, product };
};

exports.getProductPrices = async ctx => {
  const { productId } = ctx.params;
  const products = await Price.findAll({
    where: { ProductId: productId },
    order: [['updatedAt', 'ASC']],
    raw: true,
  });

  const data = groupBy(products, 'id');

  ctx.body = { success: true, variants: data };
};

exports.update = async ctx => {
  const { productId } = ctx.params;

  const { data } = ctx.request.body;
  const product = await Product.findOne({
    where: { id: productId },
  });
  if (product) {
    await product.update(data);
    ctx.body = { success: true };
    return;
  }
  Product.create({ id: productId, ...data });
  ctx.body = { success: true };
};

