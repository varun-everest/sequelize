import { sequelize } from "./conn";

const { DataTypes } = require('sequelize');

const User = sequelize.define(
    'user',
    {
        userid: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        usertype: {
            type: DataTypes.ENUM('Normal', 'Premium'),
            allowNull: false,
        }
   },
   {
        tableName : 'Users',
        timestamps : false,
   },
);

User.sync({force : true});

