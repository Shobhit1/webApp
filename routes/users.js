var express = require('express')
var router = express.Router()
var mongoose = require('mongoose')
var user = require('../models/user.js')

/* GET users */
var fakeArray = [{"first_name":"William","last_name":"Baker","email":"wbaker0@quantcast.com","admin":true,"password":"AGyQ0Y"},
{"first_name":"Brian","last_name":"Moreno","email":"bmoreno1@mac.com","admin":true,"password":"2XVfd9tcvI"},
{"first_name":"Joe","last_name":"Smith","email":"jsmith2@ycombinator.com","admin":true,"password":"RP134U3mFY8"},
{"first_name":"Heather","last_name":"Gilbert","email":"hgilbert3@goodreads.com","admin":false,"password":"bwFVJH"},
{"first_name":"Bonnie","last_name":"Hart","email":"bhart4@liveinternet.ru","admin":false,"password":"7AnlaeHIgW"},
{"first_name":"Amanda","last_name":"Tucker","email":"atucker5@unesco.org","admin":false,"password":"oXP8JCMGM7k6"},
{"first_name":"William","last_name":"Hamilton","email":"whamilton6@shinystat.com","admin":true,"password":"3hzr7d"},
{"first_name":"Carl","last_name":"Carr","email":"ccarr7@engadget.com","admin":true,"password":"8rjgY9Z9IQ3H"},
{"first_name":"Willie","last_name":"Andrews","email":"wandrews8@printfriendly.com","admin":true,"password":"PtagOUHT"},
{"first_name":"Martin","last_name":"Nichols","email":"mnichols9@gnu.org","admin":false,"password":"HDc6Nre"},
{"first_name":"Kimberly","last_name":"Martin","email":"kmartina@booking.com","admin":true,"password":"IOsX5f"},
{"first_name":"Anna","last_name":"Bailey","email":"abaileyb@storify.com","admin":false,"password":"4jZlFZBZT"},
{"first_name":"Julie","last_name":"Harris","email":"jharrisc@usnews.com","admin":true,"password":"e9L2mem"},
{"first_name":"Gary","last_name":"Weaver","email":"gweaverd@hexun.com","admin":true,"password":"iiHRtBFPGFDE"},
{"first_name":"Judith","last_name":"Ellis","email":"jellise@webeden.co.uk","admin":true,"password":"SoxhlkUq0Q"},
{"first_name":"Gerald","last_name":"Weaver","email":"gweaverf@baidu.com","admin":false,"password":"f2xTUk9YYLNI"},
{"first_name":"Dorothy","last_name":"Carroll","email":"dcarrollg@buzzfeed.com","admin":true,"password":"3WnG2D0"},
{"first_name":"Brenda","last_name":"Mason","email":"bmasonh@usnews.com","admin":false,"password":"mqRPYvneIKId"},
{"first_name":"Ashley","last_name":"Riley","email":"arileyi@php.net","admin":true,"password":"A9Yw3vYr"},
{"first_name":"Cheryl","last_name":"Hicks","email":"chicksj@imdb.com","admin":true,"password":"JaruiUq"},
{"first_name":"Susan","last_name":"Green","email":"sgreenk@latimes.com","admin":true,"password":"ybMxp2o2iEx"},
{"first_name":"Cynthia","last_name":"Bryant","email":"cbryantl@ucoz.com","admin":false,"password":"wTIesMYN"},
{"first_name":"Ryan","last_name":"Carter","email":"rcarterm@hostgator.com","admin":true,"password":"V0s7SFLkj"},
{"first_name":"Betty","last_name":"Spencer","email":"bspencern@cocolog-nifty.com","admin":true,"password":"QAuUOjEbm"},
{"first_name":"Helen","last_name":"Wagner","email":"hwagnero@liveinternet.ru","admin":true,"password":"uK57zxRi"},
{"first_name":"Sandra","last_name":"Alvarez","email":"salvarezp@elegantthemes.com","admin":false,"password":"rR5XE0EI"},
{"first_name":"Julia","last_name":"Wells","email":"jwellsq@google.ru","admin":false,"password":"PEzwBGo"},
{"first_name":"Roy","last_name":"Martin","email":"rmartinr@imdb.com","admin":true,"password":"9foCyf2I0j4"},
{"first_name":"Carol","last_name":"Simpson","email":"csimpsons@bbb.org","admin":false,"password":"p2moR6g0"},
{"first_name":"Maria","last_name":"Edwards","email":"medwardst@networkadvertising.org","admin":true,"password":"DYsOgY3h8GM"}]

router.get('/', function(req, res, next) {
  //res.json({message: 'respond with a resource'})

  console.log("Vivk")
  user.find(function(err, users){
    console.log("oook")
    if(err) return next(err)
    res.json(users)
  })
})

module.exports = router
