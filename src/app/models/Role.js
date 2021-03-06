const { Model, DataTypes } = require('sequelize');

class Role extends Model {
  static init(sequelize) {
    super.init({
      name: DataTypes.STRING,
    }, {
      sequelize,
    });
  }

  static associate(models) {
    this.hasMany(models.User, { foreignKey: 'role_id', as: 'users' });
  }
}

module.exports = Role;
