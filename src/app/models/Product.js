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
      age_id: DataTypes.INTEGER,
      gender_id: DataTypes.INTEGER
    }, {
      sequelize,
      modelName: 'Product',
    });
  }

  static associate(models) {
    // define association here
    this.belongsTo(models.AgeGroup, { foreignKey: 'age_id', as: 'ageGroup' });
    this.belongsTo(models.Gender, { foreignKey: 'gender_id', as: 'gender' });
  }
}

module.exports = Product;