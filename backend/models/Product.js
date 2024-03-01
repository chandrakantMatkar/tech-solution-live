
const {DataTypes} =  require('sequelize');

const sequelize = require('../database');

const Product = sequelize.define('product',{
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    model: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    brand: {
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

module.exports = Product;