const { Model, DataTypes } = require('sequelize');

class User extends Model {
  static init(sequelize) {
    super.init({
      firstname: DataTypes.STRING,
    }, {
      sequelize,
    });
  }
}

module.exports = User;
