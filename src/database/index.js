const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const Role = require('../app/models/Role');
const User = require('../app/models/User');

const connection = new Sequelize(dbConfig);

Role.init(connection);
User.init(connection);

Role.associate(connection.models);
User.associate(connection.models);

module.exports = connection;
