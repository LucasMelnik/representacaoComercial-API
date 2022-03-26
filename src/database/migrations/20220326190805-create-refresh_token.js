'use strict';

module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable('refresh_token', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      expires_in: {
        type: Sequelize.INTEGER,
      },
      user_id: {
        type: Sequelize.INTEGER,
      },
    });
  },

  down(queryInterface) {
    return queryInterface.dropTable('refresh_token');
  },
};
