var express = require('express')
var router = express.Router()
var mongoose = require('mongoose')
var status = require('http-status')
var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
var user = require('../models/user.js')
/* GET users */

router.get('/', function(req, res, next) {
  //res.json({message: 'respond with a resource'})

  //console.log("Vivk")
  user.find(function(err, users){
    //console.log("oook")
    if (err) {
          return res.
            status(status.INTERNAL_SERVER_ERROR).
            json({ error: err.toString() })
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
    userr[0].save(function(err) {
      if (err) {
            return res.
              status(status.INTERNAL_SERVER_ERROR).
              json({ error: err.toString() })
      }

      res.json(userr)
    })
  })
})

// accepts params as -x-www-form-urlencoded
router.post('/authenticate', function(req, res) {
    // find the user
    user.findOne({
        email: req.body.email
    }, function(err, user) {
        if (err) throw err;
        if (!user) {
            res.json({ success: false, message: 'Authentication failed. User not found.' });
        } else if (user) {
            // check if password matches
            if (user.password != req.body.password) {
                res.json({ success: false, message: 'Authentication failed. Wrong password.' });
            } else {
                // if user is found and password is right
                // create a token
                var token = jwt.sign(user, req.app.get('secretkey'), {
                    expiresIn: 86400 // expires in 24 hours
                });
                res.json({
                    success: true,
                    message: 'Success!',
                    token: token,
                    userData : user // change for only one request from front end on Login to get userData
                });
            }
        }
    });
});

module.exports = router
