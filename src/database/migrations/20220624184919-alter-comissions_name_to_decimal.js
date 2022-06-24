'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('commissions', 'name', {
      type: Sequelize.DECIMAL,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('commissions', 'name', {
      type: Sequelize.INTEGER,
    });
  },
};
