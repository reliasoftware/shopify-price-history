'use strict';
module.exports = (sequelize, DataTypes) => {
  const Price = sequelize.define(
    'Price',
    {
      ProductId: DataTypes.BIGINT,
      price: DataTypes.INTEGER,
    },
    {},
  );
  Price.associate = function(models) {
    Price.belongsTo(models.Product);
  };
  return Price;
};
