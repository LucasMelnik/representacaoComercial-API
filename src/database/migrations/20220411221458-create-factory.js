'use strict';

module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable('factories', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      corporate_name: {
        type: Sequelize.STRING,
      },
      fantasy_name: {
        type: Sequelize.STRING,
      },
      cnpj: {
        type: Sequelize.STRING,
      },
      phone: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down(queryInterface) {
    return queryInterface.dropTable('factories');
  },
};
