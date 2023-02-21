// const dbconfig = require("../config/db.config");
// const Sequelize =  require("Sequelize");
// const sequelize= new Sequelize(dbconfig.DB,dbconfig.USER,dbconfig.PASSWORD,{
//     host:dbconfig.HOST,
//     dialect:dbconfig.dialect,
//     pool:{
//         max:dbconfig.pool.max,
//         min:dbconfig.pool.min,
//         acquire:dbconfig.pool.acquire,
//         idle:dbconfig.pool.idle
//     }
// });
// const db ={}    ;
// db.Sequelize =Sequelize;
// db.sequelize=sequelize;
// db.webHook=require("./webHook")(sequelize,Sequelize);
// db.sequelize.sync()
//    .then(() => {
//      console.log("Synced db.");
//    })
//    .catch((err) => {
//      console.log("Failed to sync db: " + err.message);
//    });

// module.exports=db;
'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const  dbconfig  = require("../config/db.config");
const db = {};

let sequelize;
   sequelize= new Sequelize(dbconfig.DB,dbconfig.USER,dbconfig.PASSWORD,{
        host:dbconfig.HOST,
        dialect:dbconfig.dialect,
        pool:{
            max:dbconfig.pool.max,
            min:dbconfig.pool.min,
            acquire:dbconfig.pool.acquire,
            idle:dbconfig.pool.idle
        }
    });
(async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log('Database Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error.message);
  }
})()

fs.readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    db[file.split(".")[0]] = require("./" + file)(sequelize, Sequelize);
  });

Object.keys(db).forEach(modelName => {
  // console.log(modelName)
  if (db[modelName].associate) {
    console.log(modelName)
    db[modelName].associate(db);
  }
});

module.exports = db;