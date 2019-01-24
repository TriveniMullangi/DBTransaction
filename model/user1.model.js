
const sequelize = require('sequelize');
var mariaConnection = require('../connection/transaction.connection');

//Model Schemaa for Employee Table
let User1 = mariaConnection.define('user1', {
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
        tableName: 'user1'
    });

module.exports = {

    User1 : User1
};