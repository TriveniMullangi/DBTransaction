var logger = require('../util/logger');
var HTTP_CODES = require('../util/statusCodes');
var user1Model = require('../model/user1.model')
var user2Model = require('../model/user2.model')
var user3Model = require('../model/user3.model')
//const connection = require('../connection/transaction.connection')
const sequelize = require('sequelize');
const db = new sequelize('dbtransactions', 'miracle1', 'miracle1@', {
	dialect: 'mysql',
	host: "localhost",
	port: 3306,
	operatorsAliases: false
})
var addUser = async (req, res, next) => {
	// console.log(a)
	console.log("URL hit to :", req.hostname, req.originalUrl);
	logger.info("Entered into adding new user service");
	//let transaction;
	try {
		return db.transaction({autocommit:false},(t) => {
			// t.afterCommit(
			// 	() => {
			// 		return user1Model.User1.findAll().then(result => {
			// 			console.log(JSON.stringify(result))
			// 		})
			// 	})
			return user1Model.User1.create(req.body, {
				transaction: t
			}).then(function(user) {
				//console.log(user.id)
				//     console.log("inserted in 1st table")
				//     console.log(JSON.stringify(user))
				console.log("inserted in 1st table")
				//throw new Error("hi")
				//console.log(data)
				return user2Model.User2.create({
					// id:user.id,
					firstName: user.firstName,
					lastName: user.lastName,
					city: user.city,
					state: user.state,
					country: user.country
				}, {
					transaction: t
				})
			}).then((user1) => {
				console.log("inseryed in 2nd table")
                throw new Err("hi")
             
				return user3Model.User3.create({
					// id:user1.id,
					firstName: user1.firstName,
					lastName: user1.lastName,
					city: user1.city,
					state: user1.state,
					country: user1.country
				}, {
					transaction: t
				})
			})
		}).then((data) =>{
			//t.commit();
			res.status(HTTP_CODES.OK).send({
                "statusCode": HTTP_CODES.OK,
                "info": "data successfully inserted in 3 tables",
                "data" : data
            })
		}).catch((err) => {
			// t.rollback()
			next(err)
		})
	} catch (err) {
		next(err)
	}
}
module.exports = {
	addUser: addUser
}