const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const Role = require('../app/models/Role');
const User = require('../app/models/User');
const Customer = require('../app/models/Customer');
const AgeGroup = require('../app/models/AgeGroup');
const Gender = require('../app/models/Gender');
const Product = require('../app/models/Product');
<<<<<<< HEAD
const ProductPrice = require('../app/models/ProductPrice');
const Commission = require('../app/models/Commission');
=======
const Size = require('../app/models/Size');
const RefreshToken = require('../app/models/RefreshToken');
const Permission = require('../app/models/Permission');
>>>>>>> a37a38f1813309d1da8a3842207c87992ce9edf2

const connection = new Sequelize(dbConfig);

Role.init(connection);
User.init(connection);
Customer.init(connection);
AgeGroup.init(connection);
Gender.init(connection);
Product.init(connection);
<<<<<<< HEAD
Commission.init(connection);
ProductPrice.init(connection);

=======
Size.init(connection);
RefreshToken.init(connection);
Permission.init(connection);
>>>>>>> a37a38f1813309d1da8a3842207c87992ce9edf2

Role.associate(connection.models);
User.associate(connection.models);
AgeGroup.associate(connection.models);
Gender.associate(connection.models);
Product.associate(connection.models);
<<<<<<< HEAD
Commission.associate(connection.models);
ProductPrice.associate(connection.models);
=======
RefreshToken.associate(connection.models);
Permission.associate(connection.models);
>>>>>>> a37a38f1813309d1da8a3842207c87992ce9edf2

module.exports = connection;
