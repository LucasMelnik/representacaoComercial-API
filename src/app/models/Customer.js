/* eslint-disable linebreak-style */
const { Model, DataTypes } = require('sequelize');

class Customer extends Model {
  static init(sequelize) {
    super.init({
      corporateName: DataTypes.STRING,
      fantasyName: DataTypes.STRING,
      cnpj: DataTypes.STRING,
      stateRegistration: DataTypes.STRING,
      buyer: DataTypes.STRING,
      phone: DataTypes.STRING,
      email: DataTypes.STRING,
      purchaseCredit: DataTypes.FLOAT,
      customerAddress: DataTypes.STRING,
      addressNumber: DataTypes.INTEGER,
      complement: DataTypes.STRING,
      district: DataTypes.STRING,
      city: DataTypes.STRING,
      sate: DataTypes.STRING,
      country: DataTypes.STRING,
      cep: DataTypes.STRING,
    }, {
      sequelize,
    });
  }
}
module.exports = Customer;
