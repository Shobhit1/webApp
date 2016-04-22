var mongoose = require('mongoose')
mongoose.connect( 'mongodb://localhost/shopping-cart')
mongoose.set('debug', true) //Logging ORM Queries
