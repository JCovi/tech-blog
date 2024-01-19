const { Sequelize } = require('sequelize');
require('dotenv').config();

const databaseUrl = process.env.DATABASE_URL || process.env.LOCAL_DATABASE_URL;

const sequelize = new Sequelize(databaseUrl, {
  dialect: 'mysql',
  protocol: 'mysql',
  port: 3306,
});

module.exports = sequelize;
