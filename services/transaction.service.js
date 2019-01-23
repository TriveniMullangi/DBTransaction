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
    
    // console.log(a)
    console.log("URL hit to :", req.hostname, req.originalUrl);
    logger.info("Entered into adding new user service");
    //let transaction;
    try {
      return  db.transaction((t)=>{
            return user1Model.User1.create(req.body,{ transaction:t})
            .then(function (user) {
            //    // console.log(user.id)
            //     console.log("inserted in 1st table")
            //     console.log(JSON.stringify(user))
            throw new Err("hi")
            // return  user2Model.User2.create({
            //     id:user.id,
            //     firstName:user.firstName,
            //     lastName:user.lastName,
            //     city: user.city,
            //     state:user.state,
            //     country:user.country    
            //   },{ transaction:t})
            });
            
        }) .then(function (result) {
            //transaction.commit();
            res.send("successfully inserted in 2 tables")
          }).catch(()=>{
           // t.rollback()
            res.send("rolled back")
          })
        
    }

    catch(err)
    {
        next(err)
    }
}

module.exports ={
    addUser : addUser
}