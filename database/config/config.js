const path = require('path');
const dotenv = require('dotenv');

module.exports = async () => {
  dotenv.config();

  console.log(`Loaded env vars for env '${process.env.NODE_ENV}' and db '${process.env.DB_NAME}'.`);

  return {
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    migrationStorageTableName: 'sequelizeMeta',
    seederStorage: 'sequelize',
    seederStorageTableName: 'sequelizeData'
  };
}
