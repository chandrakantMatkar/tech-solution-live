const { DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../database');

const User = sequelize.define('user', {
    id: {
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
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('now'),
    },
    resetToken: {
        type: DataTypes.STRING,
    },
    resetTokenExpiration: { type: DataTypes.DATE }
})

module.exports = User;