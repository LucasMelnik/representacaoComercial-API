const { Model, DataTypes } = require('sequelize');

class OrderItem extends Model {
  static init(sequelize) {
    super.init({
      quantity: DataTypes.INTEGER,
    }, {
      sequelize,
    });
  }

  static associate(models) {
    this.belongsTo(models.Order, { foreignKey: 'order_id', as: 'order' });
    this.belongsTo(models.ProductPrice, { foreignKey: 'product_price_id', as: 'product_price' });
    this.belongsTo(models.Size, { foreignKey: 'size_id', as: 'size' });
  }
}

module.exports = OrderItem;
