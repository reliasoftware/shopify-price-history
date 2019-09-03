'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    'Product',
    {
      product_id: DataTypes.BIGINT,
      price: DataTypes.STRING,
      isTracking: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {},
  );
  Product.associate = function(models) {
    // associations can be defined here
  };
  return Product;
};
