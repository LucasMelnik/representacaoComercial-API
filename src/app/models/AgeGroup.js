'use strict';

const { Model, DataTypes } = require('sequelize');

class AgeGroup extends Model {
  static init(sequelize) {
    super.init({
      name: DataTypes.STRING,
    }, {
      sequelize,
      modelName: 'AgeGroup',
    });
  }

  static associate(models) {
    // define association here
    this.hasMany(models.Product, { foreignKey: 'age_id', as: 'products' });
  }
}

module.exports = AgeGroup;
