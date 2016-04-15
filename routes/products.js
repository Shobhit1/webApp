//GET /product/id/:id
//GET /product/category/:id
// GET /product/text/:query
// PUT /product/:name
var express = require('express')
var router = express.Router()
var mongoose = require('mongoose')
var status = require('http-status');
var category = require('../models/category.js')
var prod = require('../models/product.js')

router.get('/', function(req, res, next) {
  prod.find(function(err, prods){

    if (err) {
          return res.
            status(status.INTERNAL_SERVER_ERROR).
            json({ error: err.toString() })
    }
    res.json(prods)
  })
})

router.post('/add',function(req, res, next) {
  var prodNew = new prod();

 // Set the product properties that came from the POST data
 prodNew.name = req.body.name
 prodNew.pictures = req.body.pictures
 prodNew.amount = req.body.amount
 prodNew.quantity = req.body.quantity
 prodNew._category = req.body._category

 prodNew.save(function(err) {
   if (err) {
         return res.
           status(status.INTERNAL_SERVER_ERROR).
           json({ error: err.toString() })
   }

   res.json({
     message: 'Prod added successfully!',
     product : prodNew
    })
  })
})

router.put('/:name',function(req, res) {
  // Use the prod model to find a specific user
  return prod.find({name:req.param.name}, function(err, prodd) {
    if (err) {
          return res.
            status(status.INTERNAL_SERVER_ERROR).
            json({ error: err.toString() })
    }

    // Update the existing info (whatever was editted)
  
    // prodd.name = req.body.name
    // prodd.pictures = req.body.pictures
    // prodd.amount = req.body.amount
    prodd[0].quantity = req.body.quantity
    //prodd._category = req.body._category

    // Save the user and check for errors
    return prodd[0].save(function(err) {
      if (error) {
            return res.
              status(status.INTERNAL_SERVER_ERROR).
              json({ error: error.toString() })
      }

      res.json(prodd);
    });
  });
});
module.exports = router
