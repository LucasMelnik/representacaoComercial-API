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

  static associate(models) {
    this.hasMany(models.Order, { foreignKey: 'order_status_id', as: 'status' });
  }
}

module.exports = OrderStatus;
