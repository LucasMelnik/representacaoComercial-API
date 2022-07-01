'use strict';

const { Model, DataTypes } = require('sequelize');

class Colors extends Model {
  static init(sequelize) {
    super.init({
      name: DataTypes.STRING,
    }, {
      sequelize,
    });
  }

  static associate(models) {
    // define association here
    this.belongsTo(models.Product, { foreignKey: 'product_id', as: 'product' });
    this.hasMany(models.OrderItem, { foreignKey: 'color_id', as: 'color' });
  }
}

module.exports = Colors;
