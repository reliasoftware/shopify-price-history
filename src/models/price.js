'use strict';
module.exports = (sequelize, DataTypes) => {
  const Price = sequelize.define(
    'Price',
    {
      ProductId: DataTypes.BIGINT,
      price: DataTypes.STRING,
    },
    {},
  );
  Price.associate = function(models) {
    Price.belongsTo(models.Product);
  };
  return Price;
};
