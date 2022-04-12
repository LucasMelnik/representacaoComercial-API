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

  static associate(models) {
    this.hasMany(models.Product, { foreignKey: 'factory_id', as: 'factory' });
  }
}

module.exports = Factory;
