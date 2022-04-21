const { Model, DataTypes } = require('sequelize');

class OrderStatus extends Model {
  static init(sequelize) {
    super.init({
      name: DataTypes.STRING,
    }, {
      sequelize,
      tableName: 'order_status',
    });
  }
}

module.exports = OrderStatus;