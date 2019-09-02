const { Product } = require('../../models');

exports.callbacks = async ctx => {
  const {
    body: { variants = [] },
  } = ctx.request;
  variants.map(async variant => {
    const { id, product_id: ProductId, price, created_at: createdAt, updated_at: updatedAt } = variant;
    const product = await Product.findOne({
      where: {
        id,
      },
      order: [['updatedAt', 'DESC']],
    });
    if (!product || (product && product.price !== price)) {
      Product.create({ id, product_id: ProductId, price, createdAt, updatedAt });
    }
  });

  ctx.body = { success: true };
};

exports.getProduct = async ctx => {
  const { productId } = ctx.params;
  const data = await Product.findAll({
    where: {
      id: productId,
    },
    order: [['updatedAt', 'DESC']],
  });

  ctx.body = { success: true, data };
};
