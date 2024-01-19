const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;

if (process.env.DATABASE_URL) {
  // Use the provided DATABASE_URL by Heroku
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres', // Update this based on your database type
    protocol: 'postgres',
    logging: true, // Remove this line if you don't want to log SQL queries
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  });
} else {
  // Fallback to local connection
  sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306,
  });
}

module.exports = sequelize;
