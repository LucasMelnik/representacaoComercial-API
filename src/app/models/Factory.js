const { Model, DataTypes } = require('sequelize');

class Factory extends Model {
  static init(sequelize) {
    super.init({
      corporate_name: DataTypes.STRING,
      fantasy_name: DataTypes.STRING,
      cnpj: DataTypes.STRING,
      phone: DataTypes.STRING,
      email: DataTypes.STRING,
    }, {
      sequelize,
    });
  }
}

module.exports = Factory;
