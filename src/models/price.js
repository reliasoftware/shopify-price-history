'use strict';
module.exports = (sequelize, DataTypes) => {
  const Price = sequelize.define(
    'Price',
    {
      product_id: DataTypes.BIGINT,
      price: DataTypes.STRING,
    },
    {},
  );
  Price.associate = function(models) {
    Price.belongsTo(models.Product, { foreignKey: 'product_id' });
  };
  return Price;
};
