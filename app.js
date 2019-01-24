var express = require('express');
var app = express();

var cookieParser = require('cookie-parser');
var logger = require('morgan');
const usersRouter = require('./routes/transaction.route')

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/users', usersRouter);

app.use(function(req, res, next) {
  var err=new Error('Not Found');
  err.status=404;
  err.info="Route not Found";
  next(err);
});
// error handler
app.use((err,req,res,next)=>{
  if(err.isBoom){
    var error={
      "statusCode":400,
      "info":"check request body",
      "error":err.error
    };
    res.status(400).send(error);
  }
  else
  {
    if (err.name == "SequelizeDatabaseError") {
      // console.log("Invalid Column Name");
      var errorMessage = {
        "statusCode": 400,
        "info": "Invalid Column Name / Check DB Columns",
        "error": err.parent.sqlMessage
      };
      res.status(400).send(errorMessage);
    }
    //DB Credentials Error
    else if (err.name == "SequelizeAccessDeniedError") {
      console.log("Invalid Password")
      var errorMessage = {
        "status": 500,
        "info": "DB Credentials Error",
        "error": err
      };
      res.status(500).send(errorMessage);
    }
    else if(err.name == "SequelizeUniqueConstraintError"){
      //console.log("hi")
      console.log("primary key violation")
      var errorMessage = {
        "status": 400,
        "info": "primary key constraint violation",
        "error":err.parent.sqlMessage
      };
      res.status(400).send(errorMessage);
    }

    else if(err.name == "SequelizeForeignKeyConstraintError"){
      //console.log("hi")
      console.log("Foreign Key Constraint violation")
      var errorMessage = {
        "status": 400,
        "info": "Foreign key constraint violation",
       
      };
      res.status(400).send(errorMessage);
    }

    //404 Error
    else if (err.statusCode == 404) {
      var errorMessage = {
        "statusCode": parseInt(err.statusCode),
        "error": err
      };
      res.status(404).json(errorMessage);
    }
    //400 Error
    else if (err.statusCode == 400) {
      var errorMessage = {
        "statusCode": parseInt(err.statusCode),
        "info": "Bad Request",
        "error": err.error
      };
      res.status(400).json(errorMessage);
    }
    //500 Error
    else {
      res.status(400).send({
      "statusCode": 400,
      "Info":"manually thrown error",
      "Error": err.message});
    }
  }

});
app.listen(3000,()=>{
  console.log("server is listening on port 8080");
})
module.exports = app;
