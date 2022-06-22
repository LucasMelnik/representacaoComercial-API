'use strict';

const { Model, DataTypes } = require('sequelize');

class ProductSize extends Model {
  static init(sequelize) {
    super.init({
      product_id: DataTypes.INTEGER,
      size_id: DataTypes.INTEGER,
    }, {
      sequelize,
    });
  }

  static associate(models) {
    // define association here
    this.belongsTo(models.Product, { foreignKey: 'product_id', as: 'product' });
    this.belongsTo(models.Size, { foreignKey: 'size_id', as: 'size' });
  }
}

module.exports = ProductSize;
