var express = require('express')
var router = express.Router()
var mongoose = require('mongoose')
var status = require('http-status')
var user = require('../models/user.js')
// GET - Reviews, ratings: Pass email in param - header
router.get('/:email', function(req, res, next) {
  //res.json({message: 'respond with a resource'})

  //console.log("Vivk")
  user.findOne({email:req.params.email},function(err, users){
    //console.log("oook")
    if (err) {
          return res.
            status(status.INTERNAL_SERVER_ERROR).
            json({ error: err.toString() })
    }
    res.json(users.data.productsPurchased)
  })
})
// Update the reviews Pass email in body
router.put('/edit',function(req, res) {
  // Use the user model to find a specific user
//  console.log("request"+req.body.eamil)
  return user.find({email:req.body.email}, function(err, userr) {
    if (err) {
          return res.
            status(status.INTERNAL_SERVER_ERROR).
            json({ error: err.toString() })
    }

    // Update the existing info (whatever was editted)
    //userr[0].first_name = req.body.first_name
    //console.log("Vivek"+userr)
    userr[0].first_name = userr[0].first_name+""
    userr[0].last_name = userr[0].last_name+""
    for(var i=0;i<userr[0].data.productsPurchased.length;i++){
      if(userr[0].data.productsPurchased[i].name == req.body.product.name){
        userr[0].data.productsPurchased[i].rating = req.body.product.rating
        userr[0].data.productsPurchased[i].review = req.body.product.review
      }
    }
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

      res.json(userr[0].data.productsPurchased);
    })
  })
})
module.exports = router
