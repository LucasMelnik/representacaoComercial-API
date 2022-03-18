/* eslint-disable linebreak-style */
require('dotenv').config();

module.exports = {
  dialect: 'postgres',
  host: process.env.DATABASE_HOST,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: 'recomPI',
  define: {
    timestamps: true,
    underscored: true,
  },
};
