const Sequelize = require('sequelize');
const fs = require('fs');
const config = require('../config');

let _instance = null;

class Database {
  constructor () {
    if (!_instance) {
      this.startDatabase();
      this.findDatabaseModels();
      _instance = this;
    }
    return _instance;
  }

  closeAllConnections () {
    this.sequelize.connectionManager.close();
  }

  startDatabase () {
    const options = {
      host: config.database.host,
      dialect: config.database.dialect,
      dialectOptions: {
        multipleStatements: true
      },
      port: config.database.port,
      pool: {
        max: config.database.poolMax,
        min: config.database.poolMin,
        acquire: config.database.poolAcquire,
        idle: config.database.poolIdle
      },
      logging: (msg, query) => console.log(msg, query)
    };

    this.sequelize = new Sequelize(config.database.name, config.database.username, config.database.password, options);

    if (config.debugging) {
      console.log('starting  database');
      console.log('db options:', {
        dbName: config.database.name,
        dbUser: config.database.username,
        ...options
      });
    }
  }

  runRawQuery (query) {
    return _instance.sequelize.query(query);
  }

  findDatabaseModels () {
    this.models = Object.assign(
      {},
      ...fs
        .readdirSync(__dirname)
        .filter(file => file.indexOf('.js') > -1 && file !== 'index.js' && require(`./${file}`))
        .map(file => {
          const model = require(`./${file}`);
          return { [model.name]: model.init(this.sequelize) };
        })
    );
    for (const model of Object.keys(this.models)) {
      typeof this.models[model].associate === 'function' && this.models[model].associate(this.models);
    }
    // List all properties and methods of each model
    this.debugModelMethods(this.models);
  }

  // List all properties and methods of each model
  debugModelMethods (models) {
    if (process.env.NODE_ENV !== 'test') return;

    console.log('Debug mode is enabled, listing Sequelize models properties.');

    for (const [modelName, modelValue] of Object.entries(models)) {
      console.log(`\n----------------------------------\n
        ${modelName},
        \n----------------------------------`);
      console.log('Properties');

      for (const attr of Object.keys(modelValue.rawAttributes)) {
        console.log(`${modelName}.${attr}`);
      }

      for (const attr of Object.keys(modelValue.associations)) {
        console.log(`${modelName}.${attr}`);
      }

      console.log('\nAssociations');

      for (const assoc of Object.keys(modelValue.associations)) {
        for (const accessor of Object.keys(modelValue.associations[assoc].accessors)) {
          console.log(`${modelName}.${modelValue.associations[assoc].accessors[accessor]}()`);
        }
      }

      console.log('\nCommon');

      for (const func of Object.getOwnPropertyNames(Sequelize.Model.prototype)) {
        if (func === 'constructor' || func === 'sequelize') continue;
        console.log(`${modelName}.${func}()`);
      }

      console.log('\n--------------- END OF methods/properties --------------------');
    }
  }
}

module.exports = Database;
