const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const Role = require('../app/models/Role');
const User = require('../app/models/User');
const Customer = require('../app/models/Customer');

const connection = new Sequelize(dbConfig);

Role.init(connection);
User.init(connection);
Customer.init(connection);

Role.associate(connection.models);
User.associate(connection.models);
Customer.associate(connection.models);

module.exports = connection;
