'use strict';

module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.addColumn('order_items', 'color_id', {
      type: Sequelize.STRING,
    });
  },

  down(queryInterface) {
    return queryInterface.removeColumn('order_items', 'color_id');
  },
};
