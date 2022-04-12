/* eslint-disable linebreak-style */
const { Model, DataTypes } = require('sequelize');

// TODO: CHANGE ATRIBUTE "CONDITION" TO "NAME"
class PaymentCondition extends Model {
  static init(sequelize) {
    super.init({
      name: DataTypes.STRING,
    }, {
      sequelize,
    });
  }

  static associate(models) {
    this.hasMany(models.ProductPrice, { foreignKey: 'payment_condition_id', as: 'payment_condition' });
  }
}
module.exports = PaymentCondition;
