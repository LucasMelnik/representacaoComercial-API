'use strict';

const { Model, DataTypes } = require('sequelize');

class Product extends Model {
  static init(sequelize) {
    super.init({
      ref: DataTypes.STRING,
      color: DataTypes.STRING,
      image_path: DataTypes.STRING,
      factory_id: DataTypes.INTEGER,
      cost: DataTypes.DECIMAL,
      comments: DataTypes.TEXT,
    }, {
      sequelize,
    });
  }

  static associate(models) {
    // define association here
    this.belongsTo(models.AgeGroup, { foreignKey: 'age_id', as: 'ageGroup' });
    this.belongsTo(models.Gender, { foreignKey: 'gender_id', as: 'gender' });
    this.belongsTo(models.Factory, { foreignKey: 'factory_id', as: 'factory' });
    this.hasMany(models.ProductPrice, { foreignKey: 'product_id', as: 'product' });
  }
}

module.exports = Product;
