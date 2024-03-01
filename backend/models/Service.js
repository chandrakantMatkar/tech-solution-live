
const {DataTypes} =  require('sequelize');

const sequelize = require('../database');

module.exports = sequelize.define('service',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    imageUrl: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'https://picsum.photos/id/304/200/300' 
    },
    description: {
        type: DataTypes.STRING,
    }
})

