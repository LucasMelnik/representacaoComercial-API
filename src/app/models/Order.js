const { Model, DataTypes } = require('sequelize');

class Order extends Model {
  static init(sequelize) {
    super.init({
      order_date: DataTypes.DATEONLY,
      delivery_date: DataTypes.STRING,
      comments: DataTypes.TEXT,
      discount: DataTypes.STRING,
    }, {
      sequelize,
    });
  }

  static associate(models) {
    this.belongsTo(models.Customer, { foreignKey: 'customer_id', as: 'customer' });
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'seller' });
    this.belongsTo(models.Factory, { foreignKey: 'factory_id', as: 'factory' });
    this.belongsTo(models.PaymentCondition, { foreignKey: 'payment_conditions_id', as: 'payment_conditions' });
    this.belongsTo(models.Commission, { foreignKey: 'commission_id', as: 'commission' });
    this.belongsTo(models.OrderStatus, { foreignKey: 'order_status_id', as: 'status' });
  }
}

module.exports = Order;
