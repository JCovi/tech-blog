const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'mysql',
  protocol: 'mysql',
  port: 3306,
});

module.exports = sequelize;

