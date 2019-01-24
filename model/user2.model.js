
const sequelize = require('sequelize');
var mariaConnection = require('../connection/transaction.connection');

let User2 = mariaConnection.define('user2', {
    id:{
        type: sequelize.INTEGER,
        primaryKey:true,
        autoIncrement : true
     },
    firstName:sequelize.STRING,
    lastName: sequelize.STRING,
    city: sequelize.STRING,
    state: sequelize.STRING,
    country: sequelize.STRING
}, {
        timestamps: false,
        freezeTableName: true, // Model tableName will be the same as the model name
        tableName: 'user2'
    });
//comment
    module.exports = {

        User2 : User2
    };