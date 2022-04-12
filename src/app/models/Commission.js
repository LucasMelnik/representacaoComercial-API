'use strict';

const { Model, DataTypes } = require('sequelize');

class commission extends Model {
  static init(sequelize) {
    super.init({
      name: DataTypes.STRING,
    }, {
      sequelize,
    });
  }

  static associate(models) {
    // define association here
    this.hasMany(models.ProductPrice, { foreignKey: 'commission_id', as: 'commission' });
  }
}

module.exports = commission;
