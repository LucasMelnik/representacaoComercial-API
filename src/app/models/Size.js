const { Model, DataTypes } = require('sequelize');

class Size extends Model {
  static init(sequelize) {
    super.init({
      name: DataTypes.STRING,
    }, {
      sequelize,
    });
  }
}

module.exports = Size;
