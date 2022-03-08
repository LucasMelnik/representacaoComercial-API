const { Model, DataTypes } = require('sequelize');

class User extends Model {
  static init(sequelize) {
    super.init({
      firstname: DataTypes.STRING,
      lastname: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      nickname: DataTypes.STRING,
      phone: DataTypes.STRING,
    }, {
      sequelize,
    });
  }

  static associate(models) {
    this.belongsTo(models.Role, { foreignKey: 'role_id', as: 'role' });
  }
}

module.exports = User;
