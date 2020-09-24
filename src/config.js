module.exports = {
  database: {
    name: process.env.DB_NAME || 'pulse',
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || 'my_secret',
    dialect: process.env.DB_DIALECT || 'mysql',
    host: process.env.DB_HOST || '127.0.0.1',
    port: parseInt(process.env.DB_PORT) || 3306,
    poolMax: parseInt(process.env.DB_POOL_MAX) || 5000,
    poolMin: parseInt(process.env.DB_POOL_MIN) || 0,
    poolIdle: parseInt(process.env.DB_POOL_IDLE) || 10000,
    poolAcquire: parseInt(process.env.DB_POOL_ACQUIRE) || 30000
  }
};
