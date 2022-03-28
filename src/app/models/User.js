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
    this.belongsTo(models.Role, { foreignKey: 'role_id', as: 'role' });
    this.hasMany(models.RefreshToken, { foreignKey: 'user_id', as: 'user' });
  }
}

module.exports = User;
