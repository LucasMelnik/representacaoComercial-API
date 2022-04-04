const { Model, DataTypes } = require('sequelize');

class Permission extends Model {
  static init(sequelize) {
    super.init({
      name: DataTypes.STRING,
      description: DataTypes.STRING,
    }, {
      sequelize,
    });
  }

  static associate(models) {
    this.belongsToMany(models.User, { foreignKey: 'permission_id', through: 'user_permissions', as: 'users' });
    this.belongsToMany(models.Role, { foreignKey: 'permission_id', through: 'role_permissions', as: 'roles' });
  }
}

module.exports = Permission;
