'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('customers', 'purchase_credit', {
      type: Sequelize.FLOAT,
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('customers', 'purchase_credit', {
      type: Sequelize.FLOAT,
      allowNull: false,
    });
  },
};
