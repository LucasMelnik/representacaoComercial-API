'use strict';
const { Model, DataTypes } = require('sequelize');


class ProductPrice extends Model {
  static init(sequelize){
    super.init({
      price: DataTypes.DECIMAL,
      payment_condition_id: DataTypes.INTEGER,
      product_id: DataTypes.INTEGER,
      commission_id: DataTypes.INTEGER,
    }, {
      sequelize,
      modelName: 'ProductPrice',
    });
  }
  
  static associate(models) {
    // define association here
    // this.belongsTo(models.PaymentCondition, { foreignKey: 'payment_condition_id', as: 'paymentCondition' });
    this.belongsTo(models.Product, { foreignKey: 'product_id', as: 'product' });
    this.belongsTo(models.commission, { foreignKey: 'commission_id', as: 'commission' });
  }
}

  

module.exports = ProductPrice;