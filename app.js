var express = require('express')
var path = require('path')
var favicon = require('serve-favicon')
var logger = require('morgan')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var cache = require('./cache')
var jwt = require('jsonwebtoken')
var compression = require('compression')
var routes = require('./routes/index')
var users = require('./routes/users')
var products = require('./routes/products')
var orders = require('./routes/orders')
var queries = require('./routes/queries')
var reviews = require('./routes/reviews')

var app = express()
// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

app.set('secretkey', 'thsismysupersecretkey'); // secret variable

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(logger('dev'))
app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.urlencoded({extended : true}))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

// uses gzip by default
app.use(compression()) // responses will be have a attribute 'content-encoding' - gzip

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Key, Content-Encoding")
  next()
})

/*app.use(function(req, res, next) {
  var getToken = function(req){
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
      return req.headers.authorization.split(' ')[1];
    } else if (req.query && req.query.token) {
      return req.query.token;
    }
    return null;
  };

  // check header or url parameters or post parameters for token
  var token = getToken(req) // req.body.token || req.query.token || req.headers['x-access-token'];

  // decode token
  if (token) {
    // if public token is sent
    if(token == '1234')
      next();
    else{
      // verifies secret and checks exp
      jwt.verify(token, app.get('secretkey'), function(err, decoded) {
        if (err) {
          return res.json({ success: false, message: 'Failed to authenticate token.' });
        } else {
          // if everything is good, save to request for use in other routes
          req.decoded = decoded;
          next();
        }
      });
    }
  } else {

    // if there is no token
    // return an error
    return res.status(403).send({
      success: false,
      message: 'No token provided.'
    });

  }
});*/

app.use('/', routes)
app.use('/users', users)
app.use('/products', products)
app.use('/orders', orders)
app.use('/contactus', queries)
app.use('/reviews', reviews)
//memcache
cache.connect()

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500)
    res.render('error', {
      message: err.message,
      error: err
    })
  })
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500)
  res.render('error', {
    message: err.message,
    error: {}
  })
})

// redirect all http requests to https
app.all('*', function(req, res, next){
  if (req.secure) {
    return next();
  }
  res.redirect('https://'+req.hostname+':'+app.get('port')+req.url);
})


module.exports = app
