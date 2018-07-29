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
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'elven_ah_test',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || '5432',
  },
  production: {
    dialect: 'postgres',
    username: process.env.DB_USERNAME_PROD,
    password: process.env.DB_PASSWORD_PROD,
    database: process.env.DB_NAME_PROD,
    host: process.env.DB_HOST_PROD,
    port: process.env.DB_PORT_PROD,
  },
};
