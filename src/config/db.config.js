const { Sequelize, DataTypes, Model } = require('sequelize');

const connect = () => {
  const hostName = process.env.HOST;
  const dbPort = process.env.DB_PORT || 5432;
  const userName = process.env.USER;
  const password = process.env.PASSWORD || '';
  const database = process.env.DB;
  const dialect = process.env.DIALECT;

  const sequelize = new Sequelize(database, userName, password, {
    host: hostName,
    port: dbPort,
    dialect: dialect,
    pool: {
      max: 10,
      min: 0,
      acquire: 20000,
      idle: 5000,
    },
  });

  const db = {};
  db.Sequelize = Sequelize;
  db.sequelize = sequelize;
  db.allergy = require('../modules/allergy/models/allergy.model')(
    sequelize,
    DataTypes,
    Model
  );
  db.user = require('../modules/user/models/user.model')(
    sequelize,
    DataTypes,
    Model
  );
  db.token = require('../modules/user/models/token.model')(
    sequelize,
    DataTypes,
    Model
  );

  return db;
};

module.exports = {
  connect,
};
