const { Model, DataTypes } = require('sequelize');

class Size extends Model {
  static init(sequelize) {
    super.init({
      name: DataTypes.STRING,
    }, {
      sequelize,
    });
  }

  static associate(models) {
    this.hasMany(models.OrderItem, { foreignKey: 'size_id', as: 'size' });
    this.belongsToMany(models.Product, { foreignKey: 'size_id', through: 'product_sizes', as: 'sizes' });
  }
}

module.exports = Size;
