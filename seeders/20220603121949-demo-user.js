'use strict';

const bcrypt = require('bcryptjs/dist/bcrypt');

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('users', [{
      firstname: 'zaca',
      lastname: 'rias',
      email: 'zacarias@teste.com',
      password: bcrypt.hashSync('lucasbonito', 8),
      created_at: new Date(),
      updated_at: new Date(),
    }]);
  },
  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('users', null, {});
  },
};
