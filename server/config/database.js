const dotenv = require('dotenv');

dotenv.config();

/**
 * This config file bootstraps the sequelize database connection
 * by instantiating the required database credentials.
 * Modules specific to sequelize are left in ES5
 */
module.exports = {
  development: {
    dialect: 'postgres',
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'elven_ah_dev',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || '5432',
  },
  test: {
    dialect: 'postgres',
    username: process.env.DB_USERNAME_TEST || 'postgres',
    password: process.env.DB_PASSWORD_TEST || '',
    database: process.env.DB_NAME_TEST || 'elven_ah_test',
    host: process.env.DB_HOST_TEST || 'localhost',
    port: process.env.DB_PORT_TEST || '5432',
  },
  production: {
    dialect: 'postgres',
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
  },
};
