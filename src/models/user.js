'use strict';
const bcrypt = require('bcrypt');
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
          isEmail: {
            msg: 'Provided value is not a valid email.',
          },
          notEmpty: {
            msg: 'Email cannot be empty.',
          },
        },
      },
      phone: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
          notEmpty: {
            msg: 'Phone cannot be empty.',
          },
        },
      },
      userName: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {},
  );
  User.associate = function(models) {
    // associations can be defined here
  };
  User.prototype.verifyPassword = function(password) {
    return bcrypt.compare(password, this.password);
  };
  return User;
};
