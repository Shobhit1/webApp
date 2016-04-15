var express = require('express')
var router = express.Router()
var mongoose = require('mongoose')
var status = require('http-status');
var user = require('../models/user.js')
/* GET users */

router.get('/', function(req, res, next) {
  //res.json({message: 'respond with a resource'})

  //console.log("Vivk")
  user.find(function(err, users){
    //console.log("oook")
    if (error) {
          return res.
            status(status.INTERNAL_SERVER_ERROR).
            json({ error: error.toString() })
    }
    res.json(users)
  })
})

router.get('/:email', function(req, res, next) {

  // if (!req.user) {  // Set req.user during authentication
  //   return res.
  //     status(status.UNAUTHORIZED).
  //     json({ error: 'Not logged in' })
  // }

  user.find({email:req.params.email },function(err, users){
    if (err) {
          return res.
            status(status.INTERNAL_SERVER_ERROR).
            json({ error: err.toString() })
    }
    res.json(users[0])
  })
})

router.post('/register',function(req, res, next) {
  var userNew = new user();

 // Set the user properties that came from the POST data
 userNew.first_name = req.body.first_name
 userNew.last_name = req.body.last_name
 userNew.email = req.body.email
 userNew.admin = req.body.admin
 userNew.password = req.body.password
 //userNew.cart = []
 //userNew.active = isLoggedIn ? true : false
 // Save the user and check for errors
 userNew.save(function(err) {
   if (err) {
         return res.
           status(status.INTERNAL_SERVER_ERROR).
           json({ error: err.toString() })
   }

   res.json({
     message: 'User added successfully!',
     user : userNew
    })
  })
})

router.put('/:email',function(req, res) {
  // Use the user model to find a specific user
  return user.find({email:req.params.email}, function(err, userr) {
    if (err) {
          return res.
            status(status.INTERNAL_SERVER_ERROR).
            json({ error: err.toString() })
    }

    // Update the existing info (whatever was editted)
    userr[0].first_name = req.body.first_name
    //userr.last_name = req.body.last_name
    //userr.email = req.body.email
    // userr.admin = req.body.admin
    // userr.password = req.body.password
    // Save the user and check for errors
    userr[0].save(function(error) {
      if (error) {
            return res.
              status(status.INTERNAL_SERVER_ERROR).
              json({ error: error.toString() })
      }

      res.json(userr);
    });
  });
});
module.exports = router
