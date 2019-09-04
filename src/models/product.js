'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    'Product',
    {
      isShow: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {},
  );
  Product.associate = function(models) {
    Product.hasMany(models.Price);
  };
  return Product;
};
