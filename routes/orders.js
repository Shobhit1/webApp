var express = require('express')
var router = express.Router()
var mongoose = require('mongoose')
var status = require('http-status');
var category = require('../models/category.js')
var prod = require('../models/product.js')
var order = require('../models/orders.js')
var user = require('../models/user.js')
var nodemailer = require('nodemailer')
function sentConfirmationEmail(req) {

    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'testcartt@gmail.com', // Your email id
            pass: 'momisgreat1' // Your password
        }
    })
    var text = 'Hello,'+req.body.email+' from Slick \n\n'+'Your order is Received'
    var sentOrNot= false
    var mailOptions = {
        from: 'testcartt@gmail.com', // sender address
        to: req.body.email, // list of receivers
        subject: 'Order Confirmation', // Subject line
        text: text
        // html: '<b>Hello world ✔</b>'
    }
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            console.log("Email Not Sent"+error);
            //res.json({status: 'Email not Sent'})
        }else{
            console.log('Message sent: ' + info.response)
            // res.json({
            //   response: info.response,
            //   status: 'Email Sent'
            // })
            sentOrNot = true
        }
    })
    return sentOrNot
}
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
        //  return res.
        //    status(status.INTERNAL_SERVER_ERROR).
        //    json({ error: err.toString() })
        console.log("Can't save the order in database")
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
   var boolean_chack_email = sentConfirmationEmail(req)
   console.log("Email Sent" + boolean_chack_email)
   res.json({
     message: 'Order initiated! Purchase made successfully',
     order : ordNew
    })
  })

})

module.exports = router
