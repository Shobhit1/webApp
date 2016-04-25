var mongoose = require('mongoose')
mongoose.connect( 'mongodb://slick:123456@ds019101.mlab.com:19101/shopping-cart')
// mongoose.connect( 'mongodb://localhost:27017/shopping-cart')
mongoose.set('debug', true) //Logging ORM Queries
