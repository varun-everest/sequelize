"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var conn_1 = require("./conn");
var DataTypes = require('sequelize').DataTypes;
var User = conn_1.sequelize.define('user', {
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
}, {
    tableName: 'Users',
    timestamps: false,
});
User.sync({ force: true });
