/* eslint-disable linebreak-style */
const { Model, DataTypes } = require('sequelize');

class Payment_Conditions extends Model {
  static init(sequelize) {
    super.init({
      condition: DataTypes.STRING,
    }, {
      sequelize,
    });
  }
}
module.exports = Payment_Conditions;
