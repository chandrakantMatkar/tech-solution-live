
const {DataTypes} =  require('sequelize');

const sequelize = require('../database');

const Contact = sequelize.define('contact',{
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    convenientTime: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    message: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    remark: {
        type: DataTypes.TEXT
    }
})

module.exports = Contact;