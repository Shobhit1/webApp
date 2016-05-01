//GET /products/name/:name
//GET /products/category/:id
// PUT /products/:name
var express = require('express')
var router = express.Router()
var mongoose = require('mongoose')
var status = require('http-status')
var cache = require('../cache')
var category = require('../models/category.js')
var prod = require('../models/product.js')
function microtime() {
    var now = new Date().getTime() / 1000
    var s = parseInt(now)
    return (Math.round((now - s) * 1000) / 1000) + ' ' + s
}
router.get('/', function(req, res, next) {
  cache.get('mykey', function(error, result){
      console.log("HIT",result)

      if(result == null)  {
        result = microtime()
        // cache.set('key', result)
        prod.find({}).sort({
            //skip:0, // Starting Row
            //limit:10, // Ending Row

                amount:1//Sort by Price Added DESC

        }).exec(
        function(err, prods){
          if (err) {
                return res.
                  status(status.INTERNAL_SERVER_ERROR).
                  json({ error: err.toString() })
          }
          cache.set('mykey',prods)
          res.json(prods)

        })
        ////
      }
      else{
        res.json(JSON.parse(result.mykey))
      }
      // res.json('index', {title: "Hello Express at " + result})
    })

})
// get products in Descending amount sort.
router.get('/desc', function(req, res, next) {
  prod.find({}).sort({
      //skip:0, // Starting Row
      //limit:10, // Ending Row

          amount:-1//Sort by Price Added DESC

  }).exec(
  function(err, prods){
    if (err) {
          return res.
            status(status.INTERNAL_SERVER_ERROR).
            json({ error: err.toString() })
    }
    res.json(prods)
  })
})
// get specific named product
router.get('/:name', function(req, res, next) {
  prod.find({name : req.params.name},function(err, prods){

    if (err) {
          return res.
            status(status.INTERNAL_SERVER_ERROR).
            json({ error: err.toString() })
    }
    if(prods.length == 0){
      res.
        status(status.NOT_FOUND).
        json({ "statusCode": status.NOT_FOUND})
    }else{
      res.json(prods)
    }
  })
})

// get specific category product in sorted Descending format
router.get('/category/:id/desc', function(req, res, next) {
  prod.find({_category : req.params.id}).sort({
          amount:-1//Sort by Price Added DESC
  }).exec(
  function(err, prods){

    if (err) {
          return res.
            status(status.INTERNAL_SERVER_ERROR).
            json({ error: err.toString() })
    }
    res.json(prods)
  })
})
// get specific category product in sorted Ascending format OR Defualt
router.get('/category/:id', function(req, res, next) {
  prod.find({_category : req.params.id}).sort({
          amount:1//Sort by Price Added DESC
  }).exec(
  function(err, prods){

    if (err) {
          return res.
            status(status.INTERNAL_SERVER_ERROR).
            json({ error: err.toString() })
    }
    res.json(prods)
  })
})

router.post('/add',function(req, res, next) {
  var prodNew = new prod()

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
      if (err) {
            return res.
              status(status.INTERNAL_SERVER_ERROR).
              json({ error: err.toString() })
      }

      res.json(prodd);
    })
  })
})
module.exports = router
