var logger = require('../util/logger');
//var HTTP_CODES = require('../util/statusCodes');
var user1Model = require('../model/user1.model')
var user2Model = require('../model/user2.model')
var user3Model = require('../model/user3.model')
//const connection = require('../connection/transaction.connection')
const sequelize = require('sequelize');
const db = new sequelize('dbtransactions', 'miracle1', 'miracle1@', {
    dialect: 'mysql',
    host: "localhost",
    port: 3306,
    operatorsAliases:false
  })
var addUser = async (req, res, next) => {
    console.log("URL hit to :", req.hostname, req.originalUrl);
    logger.info("Entered into adding new user service");
    let transaction;
    try {
                transaction = await  db.transaction();
                let data1 = await user1Model.User1.create(req.body,transaction)
                 let data2 = await user2Model.User2.create({firstName:"fjdhf"},transaction)
                let data3 = await user3Model.User3.create({firstName:"fjdhf"},transaction)
                await transaction.commit()
                res.send("committed")
    }

    catch(err)
    {
        await transaction.rollback()
        res.send("rolled back")
    }
}

module.exports ={
    addUser : addUser
}