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
}
module.exports = PaymentCondition;
