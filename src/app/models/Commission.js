'use strict';

const { Model, DataTypes } = require('sequelize');

// TODO: COMMISSAO DEPENDE DA ROLE DO USUARIO
// EXEMPLO: REPRESENTANTE 10% && PREPOSTO 6%
class Commission extends Model {
  static init(sequelize) {
    super.init({
      name: DataTypes.STRING,
    }, {
      sequelize,
    });
  }

  static associate(models) {
    this.hasMany(models.ProductPrice, { foreignKey: 'commission_id', as: 'commission' });
    this.hasMany(models.ProductPrice, { foreignKey: 'commission_id', as: 'order_commission' });
  }
}

module.exports = Commission;
