/* eslint-disable linebreak-style */
const { Model, DataTypes } = require('sequelize');

class Customer extends Model {
  static init(sequelize) {
    super.init({
      corporate_name: DataTypes.STRING,
      fantasy_name: DataTypes.STRING,
      cnpj: DataTypes.STRING,
      state_registration: DataTypes.STRING,
      buyer: DataTypes.STRING,
      phone: DataTypes.STRING,
      email: DataTypes.STRING,
      purchase_credit: DataTypes.FLOAT,
      customer_address: DataTypes.STRING,
      address_number: DataTypes.INTEGER,
      complement: DataTypes.STRING,
      district: DataTypes.STRING,
      city: DataTypes.STRING,
      state: DataTypes.STRING,
      country: DataTypes.STRING,
      zip: DataTypes.STRING,
    }, {
      sequelize,
    });
  }

  static associate(models) {
    this.hasMany(models.Order, { foreignKey: 'customer_id', as: 'customer' });
  }
}
module.exports = Customer;
