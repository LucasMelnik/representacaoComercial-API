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
  }
}

module.exports = Colors;
