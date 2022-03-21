'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ref: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      color: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      image_path: {
        type: Sequelize.STRING
      },
      factory_id: {
        type: Sequelize.INTEGER
      },
      cost: {
        type: Sequelize.DECIMAL
      },
      comments: {
        type: Sequelize.TEXT
      },
      age_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'age_groups', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      gender_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'genders', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Products');
  }
};