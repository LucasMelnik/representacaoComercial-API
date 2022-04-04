'use strict';

module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable('customers', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      corporateName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      fantasyName: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      cnpj: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      stateRegistration: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      buyer: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      phone: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      purchaseCredit: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      customerAddress: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      addressNumber: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      complement: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      district: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      city: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      state: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      country: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      cep: {
        type: Sequelize.STRING,
        allowNull: true,
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
    return queryInterface.dropTable('customers');
  },
};
