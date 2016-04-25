var express = require('express')
var router = express.Router()
var mongoose = require('mongoose')
var status = require('http-status');
var category = require('../models/category.js')
var prod = require('../models/product.js')
var order = require('../models/orders.js')
var user = require('../models/user.js')
router.get('/', function(req, res, next) {
  order.find({}).sort({
      //skip:0, // Starting Row
      //limit:10, // Ending Row

          amount:1//Sort by Price Added DESC

  }).exec(
  function(err, ords){
    if (err) {
          return res.
            status(status.INTERNAL_SERVER_ERROR).
            json({ error: err.toString() })
    }
    res.json(ords)
  })
})

router.post('/add',function(req, res, next) {
  var ordNew = new order()

 // Set the product properties that came from the POST data
 // prodNew.name = req.body.name
 // prodNew.pictures = req.body.pictures
 // prodNew.amount = req.body.amount
 // prodNew.quantity = req.body.quantity
 // prodNew._category = req.body._category
 ordNew.email = req.body.email
 ordNew.total_amount = req.body.total_amount
 ordNew.data.products = req.body.data.products

 ordNew.save(function(err) {
   if (err) {
         return res.
           status(status.INTERNAL_SERVER_ERROR).
           json({ error: err.toString() })
   }
  //  user.findOneAndUpdate({email:req.body.email},
  //    { "$push": { "data.productsPurchased":req.body.data.products}},
  //   {safe: true, upsert: true, new : true},function(err, users){
  //    if (err) {
  //         console.log(err.toString())
  //    }
  //  })
   for (var i = 0; i < req.body.data.products.length; i++) {
    // alert(myStringArray[i]);
    user.findOneAndUpdate({email:req.body.email},
      { "$push": { "data.productsPurchased":req.body.data.products[i]}},
     {safe: true, upsert: true, new : true},function(err, users){
      if (err) {
           console.log(err.toString())
      }
    })
  }

   res.json({
     message: 'Order initiated! Purchase made successfully',
     product : ordNew
    })
  })
})

module.exports = router
