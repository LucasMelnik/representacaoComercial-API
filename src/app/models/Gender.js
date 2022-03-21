'use strict';

const { Model, DataTypes } = require('sequelize');

class Gender extends Model {
  static init(sequelize) {
    super.init({
      name: DataTypes.STRING,
    }, {
      sequelize,
      modelName: 'Gender',
    });
  }

  static associate(models) {
    // define association here
    this.hasMany(models.Product, { foreignKey: 'gender_id', as: 'products' });
  }
}

module.exports = Gender;
