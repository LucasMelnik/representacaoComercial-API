'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('product_prices', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      price: {
        allowNull: false,
        type: Sequelize.DECIMAL,
      },
      payment_condition_id: {
        type: Sequelize.INTEGER,
        references: { model: 'payment_conditions', key: 'id' },
        onUpdate: 'CASCADE',
        OnDelete: 'CASCADE',
      },
      product_id: {
        type: Sequelize.INTEGER,
        references: { model: 'products', key: 'id' },
        onUpdate: 'CASCADE',
        OnDelete: 'CASCADE',
      },
      commission_id: {
        type: Sequelize.INTEGER,
        references: { model: 'commissions', key: 'id' },
        onUpdate: 'CASCADE',
        OnDelete: 'CASCADE',
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('product_prices');
  },
};
