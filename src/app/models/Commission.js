'use strict';
const { Model, DataTypes } = require('sequelize');


class commission extends Model {
  static init(sequelize){
    super.init({
      commission: DataTypes.STRING
    }, {
      sequelize,
      modelName: 'commission',
    });
  }
  
  static associate(models) {
    // define association here
    this.hasMany(models.ProductPrice, { foreignKey: 'commission_id', as: 'productPrices' });
  }
}

  

module.exports = commission;