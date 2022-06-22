const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const Role = require('../app/models/Role');
const User = require('../app/models/User');
const Customer = require('../app/models/Customer');
const AgeGroup = require('../app/models/AgeGroup');
const Gender = require('../app/models/Gender');
const Product = require('../app/models/Product');
const ProductPrice = require('../app/models/ProductPrice');
const Commission = require('../app/models/Commission');
const Size = require('../app/models/Size');
const RefreshToken = require('../app/models/RefreshToken');
const Permission = require('../app/models/Permission');
const PaymentCondition = require('../app/models/PaymentCondition');
const Factory = require('../app/models/Factory');
const OrderStatus = require('../app/models/OrderStatus');
const Order = require('../app/models/Order');
const OrderItem = require('../app/models/OrderItem');
const ProductSize = require('../app/models/ProductSize');

const connection = new Sequelize(dbConfig);

Role.init(connection);
User.init(connection);
Customer.init(connection);
AgeGroup.init(connection);
Gender.init(connection);
Product.init(connection);
Commission.init(connection);
ProductPrice.init(connection);
PaymentCondition.init(connection);
Size.init(connection);
RefreshToken.init(connection);
Permission.init(connection);
Factory.init(connection);
OrderStatus.init(connection);
Order.init(connection);
OrderItem.init(connection);
ProductSize.init(connection);

ProductSize.associate(connection.models);
Role.associate(connection.models);
User.associate(connection.models);
AgeGroup.associate(connection.models);
Gender.associate(connection.models);
Product.associate(connection.models);
Commission.associate(connection.models);
ProductPrice.associate(connection.models);
RefreshToken.associate(connection.models);
Permission.associate(connection.models);
Factory.associate(connection.models);
PaymentCondition.associate(connection.models);
Customer.associate(connection.models);
Order.associate(connection.models);
OrderStatus.associate(connection.models);
OrderItem.associate(connection.models);

module.exports = connection;
