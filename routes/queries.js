var express = require('express')
var router = express.Router()
var mongoose = require('mongoose')
var status = require('http-status')
var nodemailer = require('nodemailer')
var quer = require('../models/query.js')
router.post('/', function(req, res, next) {
    console.log("Vivek req body contact us"+req)
    var queNew = new quer()
    queNew.first_name = req.body.first_name
    queNew.last_name = req.body.last_name
    queNew.email = req.body.email
    queNew.statement = req.body.statement
    queNew.save(function(err) {
      if (err) {
            // return res.
            //   status(status.INTERNAL_SERVER_ERROR).
            //   json({ error: err.toString() })
            console.log("Database bug for contactus queries")
      }
     })

    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'testcartt@gmail.com', // Your email id
            pass: 'momisgreat1' // Your password
        }
    })
    var text = 'Hello,'+req.body.email+' from Slick \n\n'+'Your query is being processed'
    var mailOptions = {
        from: 'testcartt@gmail.com', // sender address
        to: req.body.email, // list of receivers
        subject: 'Ticket has been raised. thank you for contacting us', // Subject line
        text: text //, // plaintext body
        // html: '<b>Hello world ✔</b>' // You can choose to send an HTML body instead
    }
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            console.log("Email Bug"+error)
            res.json({status: 'Email not Sent'})
        }else{
            console.log('Message sent: ' + info.response)
            res.json({
              message: 'Your query is in place. Someone will get back to you!',
              ticket_number : queNew.qid,
              response: info.response,
              status: 'Email Sent'
             })
        }
    })
})
module.exports = router
