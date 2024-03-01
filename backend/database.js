const {Sequelize} = require('sequelize');
const config =  require('./config/config')

const sequelize = new Sequelize(config.dbname,config.dbusername,config.dbpassword,{dialect:config.dialect, host:config.host, port:config.port});

module.exports = sequelize;