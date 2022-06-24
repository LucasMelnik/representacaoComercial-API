'use strict';

module.exports = {
  up(queryInterface) {
    return queryInterface.removeColumn('users', 'role_id');
  },

  down(queryInterface, Sequelize) {
    return queryInterface.addColumn('users', 'role_id', {type: Sequelize.INTEGER});
  },
};
