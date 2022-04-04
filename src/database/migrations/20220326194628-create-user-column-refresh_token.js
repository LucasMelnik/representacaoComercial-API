'use strict';

module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.addColumn('users', 'refresh_token_id', {
      type: Sequelize.INTEGER,
    }, {
      Sequelize,
    });
  },

  down(queryInterface) {
    return queryInterface.removeColumn('users', 'refresh_token_id');
  },
};
