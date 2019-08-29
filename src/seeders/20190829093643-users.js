const bcrypt = require('bcrypt');
const { bcryptRound } = require('../config').jwt;

module.exports = {
  up: (queryInterface, Sequelize) => {
    return bcrypt.hash('admin#1234', bcryptRound).then(password =>
      queryInterface.bulkInsert(
        'Users',
        [
          {
            firstName: 'Admin',
            lastName: 'User',
            email: 'admin@user.com',
            password,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
        {},
      ),
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  },
};
