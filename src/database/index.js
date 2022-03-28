const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const Role = require('../app/models/Role');
const User = require('../app/models/User');
const AgeGroup = require('../app/models/AgeGroup');
const Gender = require('../app/models/Gender');
const Product = require('../app/models/Product');
const Size = require('../app/models/Size');
const RefreshToken = require('../app/models/RefreshToken');

const connection = new Sequelize(dbConfig);

Role.init(connection);
User.init(connection);
AgeGroup.init(connection);
Gender.init(connection);
Product.init(connection);
Size.init(connection);

Role.associate(connection.models);
User.associate(connection.models);
AgeGroup.associate(connection.models);
Gender.associate(connection.models);
Product.associate(connection.models);
// RefreshToken.associate(connection.models);

module.exports = connection;
