'use strict';

module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable('payment_conditions', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      condition: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    });
  },

  down(queryInterface) {
    return queryInterface.dropTable('payment_conditions');
  },
};
