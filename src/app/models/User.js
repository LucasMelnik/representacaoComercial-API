const bcrypt = require('bcryptjs/dist/bcrypt');
const { Model, DataTypes } = require('sequelize');

class User extends Model {
  static init(sequelize) {
    super.init({
      firstname: DataTypes.STRING,
      lastname: DataTypes.STRING,
      email: DataTypes.STRING,
      password: {
        type: DataTypes.STRING,
        set(value) {
          this.setDataValue('password', bcrypt.hashSync(value, 8));
        },
      },
      nickname: DataTypes.STRING,
      phone: DataTypes.STRING,
    }, {
      sequelize,
    });
  }

  static associate(models) {
    this.hasMany(models.RefreshToken, { foreignKey: 'user_id', as: 'user' });
    this.belongsToMany(models.Role, { foreignKey: 'user_id', through: 'user_roles', as: 'roles' });
    this.belongsToMany(models.Permission, { foreignKey: 'user_id', through: 'user_permissions', as: 'permissions' });
  }
}

module.exports = User;
