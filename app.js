var createError = require('http-errors');
var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var helmet = require('helmet')
require('dotenv').config()


//swagger 
var autogenOutputFile = require('./swagger-output.json')
var swaggerUi = require('swagger-ui-express')


var baseRouter = require('./routes/index');
var authRouter = require('./routes/auth');
var sellerRouter = require('./routes/seller')
var storefrontRouter = require('./routes/storefront & catalog')
var usersRouter = require('./routes/users')
var adminRouter = require('./routes/admin')
var ratingReviewRouter = require('./routes/rating & review')
var cartRouter = require('./routes/cart')
var checkoutRouter = require('./routes/checkout')
var paymentRouter = require('./routes/payment')
var { dbConnection } = require('./config/db.config')

//sync models
var models = require('./model/index')
models.db

//database Connection
async function databaseConnection() {
  try {
    await dbConnection.authenticate()
    console.log(' database connection was established succesfully ')
  } catch (err) {
    console.log('connection was not established an error occured ', err)

  }
}

databaseConnection()


var app = express();

app.use(helmet())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/',  baseRouter, authRouter, sellerRouter, storefrontRouter, usersRouter, adminRouter, ratingReviewRouter, cartRouter, checkoutRouter, paymentRouter )
app.use('/doc', swaggerUi.serve, swaggerUi.setup(autogenOutputFile))



// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404, 'route does not exist'));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json(err);
});

module.exports = app;
