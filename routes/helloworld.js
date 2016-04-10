var express = require('express')
var router = express.Router()

/* GET helloworld */
router.get('/', function(req, res, next) {
  res.render('helloworld', { message: 'Hello World', name: 'Shobhit' })
})

module.exports = router
